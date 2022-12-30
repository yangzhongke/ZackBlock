using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.JSInterop;
using System.Reflection;

namespace WebCSC;
public static class MainClass
{
    private static IJSRuntime js;
    private static HttpClient httpClient;

    static async Task Main(string[] args)
    {
        var builder = WebAssemblyHostBuilder.CreateDefault(args);
        //WebAssembly中的HttpClient必须设置BaseAddress
        builder.Services.AddScoped(sp =>
   new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
        var host = builder.Build();
        js = host.Services.GetRequiredService<IJSRuntime>();
        httpClient = host.Services.GetRequiredService<HttpClient>();
        await host.RunAsync();
    }

    static async Task<IEnumerable<string>> GetRefLibraries()
    {
        List<string> references = new();
        references.Add("/_framework/System.Core.dll");
        references.Add("/_framework/System.Runtime.dll");
        references.Add("/_framework/mscorlib.dll");
        references.Add("/_framework/System.Private.CoreLib.dll");
        references.Add("/_framework/System.Console.dll");
        return references;
    }

    private static MethodInfo GetEntryMethod(Assembly asm)
    {
        Type type = asm.GetType("Script");
        return type.GetMethod("<Factory>", BindingFlags.Static | BindingFlags.Public);
    }

    [JSInvokable]
    public static async Task Run(string code)
    {
        List<MetadataReference> references = new List<MetadataReference>();
        foreach (var libPath in await GetRefLibraries())
        {
            var referenceStream = await httpClient.GetStreamAsync(libPath);
            references.Add(MetadataReference.CreateFromStream(referenceStream));
        }
        //WebAssembly不支持并发编译，所以要设置concurrentBuild:false，
        //否则Emit会报错System.PlatformNotSupportedException: Cannot wait on monitors on this runtime.
        var compilationOptions = new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary,concurrentBuild:false)
            .WithUsings("System","System.Text", "System.Collections.Generic", "System.IO", "System.Linq", "System.Threading", "System.Threading.Tasks");
        CSharpParseOptions parserOptions = CSharpParseOptions.Default.
            WithLanguageVersion(LanguageVersion.Latest).WithKind(SourceCodeKind.Script);
        var syntaxTree = SyntaxFactory.ParseSyntaxTree(code, parserOptions);
        var scriptCompilation = CSharpCompilation.CreateScriptCompilation(
        "main.dll", syntaxTree ,
       options: compilationOptions).AddReferences(references);
        using MemoryStream stream = new MemoryStream();
        var emitResult = scriptCompilation.Emit(stream);
        stream.Position = 0;
        if (emitResult.Success)
        {
            Assembly asm = Assembly.Load(stream.ToArray());
            MethodInfo entryMethod = GetEntryMethod(asm);
            Task<object> result = (Task<object>)entryMethod.Invoke(null,new object[] { new object[2] });
            await result;
        }
        else
        {
            var msgs = emitResult.Diagnostics.Select(d => d.ToString());
            string msg = string.Join('\n', msgs);
            throw new Exception(msg);
        }
    }
}