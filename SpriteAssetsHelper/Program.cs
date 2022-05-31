using SpriteAssetsHelper;
using System.Text.Json;

string dir;
if(args.Length>0)
{
    dir = args[0];
}
else
{
    dir = @"E:\主同步盘\我的坚果云\MyCode\DOTNET\ZackBlock\ZackBlockFrontEnd\sprites\";
}
var spriteDirs = Directory.EnumerateDirectories(dir);
List<Sprite> sprites = new List<Sprite>();
foreach(var spriteDir in spriteDirs)
{
    Sprite sprite = new Sprite();
    sprites.Add(sprite);
    var spriteName = Path.GetFileName(spriteDir);
    sprite.Name = spriteName;
    var animationDirs = Directory.EnumerateDirectories(spriteDir);
    List<Animation> animations = new List<Animation>();
    foreach(var animationDir in animationDirs)
    {
        Animation animation = new Animation();
        animations.Add(animation);
        var animationName = Path.GetFileName(animationDir);
        animation.Name = animationName;
        var files = Directory.EnumerateFiles(animationDir, "*.png")
            .Select(f=>Path.GetFileName(f))
            .OrderBy(f=>Convert.ToInt32(Path.GetFileNameWithoutExtension(f)));
        animation.FileNames = files.ToArray();
    }
    sprite.Animations = animations.ToArray();
}
string json = JsonSerializer.Serialize(sprites,new JsonSerializerOptions { WriteIndented=true,PropertyNamingPolicy= JsonNamingPolicy.CamelCase });
File.WriteAllText(Path.Combine(dir, "manifest.json"), json);