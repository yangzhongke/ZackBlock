using Microsoft.CodeAnalysis;

namespace WebCSC
{
    public record RunResult(bool Success,string? Message=null,IEnumerable<Diagnostic>? Diagnostics = null);
}
