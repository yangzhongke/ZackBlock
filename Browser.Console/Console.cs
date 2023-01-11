using Microsoft.JSInterop;
using WebCSC;

namespace System;
public static class Console
{
    public static void WriteLine(object msg)
    {
        WebCSCMain.JSInProcRuntime.InvokeVoid("alert", Convert.ToString(msg));
    }

    public static void WriteLine(string msg)
    {
        WriteLine((object)msg);
    }

    public static void WriteLine(string format, params object?[] arg)
    {
        WriteLine(string.Format(format,arg));
    }

    public static string ReadLine()
    {
        //use IJSInProcessRuntime instead of IJSRuntime, because IJSInProcessRuntime provides asynchronous methods.
        return WebCSCMain.JSInProcRuntime.Invoke<string>("prompt");
    }

    public static string Title
    {
        get
        {
            return WebCSCMain.JSInProcRuntime.Invoke<string>("eval", "document.title");
        }
        set
        {
            WebCSCMain.JSInProcRuntime.Invoke<string>("eval", $"document.title='{value}'");
        }
    }

    public static void ReadKey()
    {
        WebCSCMain.JSInProcRuntime.InvokeVoid("alert", "Press space or enter to continue.");
    }
}