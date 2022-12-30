(function () {
    window.webcsc = {
        start: async function () {
            await Blazor.start();
        },
        run: async function (code) {
            await DotNet.invokeMethodAsync(
                'WebCSC', 'Run', code
            );
        },
    };
})();