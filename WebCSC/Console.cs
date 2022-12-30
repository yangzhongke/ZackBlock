using Microsoft.JSInterop;
using WebCSC;

namespace System;
public static class Console
{
    public static void WriteLine(object msg)
    {
        MainClass.JSInProcRuntime.InvokeVoid("alert", msg);
    }

    public static string ReadLine()
    {
        //IJSRuntime必须是异步的，而IJSInProcessRuntime提供了同步调用的方法，
        //所以这里必须用IJSInProcessRuntime，否则会卡死
        return MainClass.JSInProcRuntime.Invoke<string>("prompt");
    }
}