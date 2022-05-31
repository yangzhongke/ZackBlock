using OpenCvSharp;

string srcDir = @"E:\主同步盘\我的坚果云\技术资料\游戏资源\2d精灵资源\yzk_dancer精灵\";
string destDir = @"e:\temp\yzk_dancer";

foreach(var dir in Directory.EnumerateDirectories(srcDir))
{
    string animationName = Path.GetFileName(dir);
    string destAnimationDir = Path.Combine(destDir, animationName);
    CropAnimation(dir, destAnimationDir);
}

//获取包含所有图片的最大的外接矩形
static Rect FindMaxBoundingRect(string[] imgFiles)
{
    using Mat destMat = Cv2.ImRead(imgFiles[0], ImreadModes.Grayscale);
    foreach (string imgFile in imgFiles)
    {
        using var matImg = Cv2.ImRead(imgFile, ImreadModes.Grayscale);
        Cv2.BitwiseOr(destMat, matImg, destMat);
    }
    var arrayContours = Cv2.FindContoursAsArray(destMat, RetrievalModes.External, ContourApproximationModes.ApproxNone);
    Rect rect = Cv2.BoundingRect(arrayContours.SelectMany(a => a));//把Contours合并
    return rect;
}

static void CropAnimation(string srcAnimationDir,string destAnimationDir)
{
    Directory.CreateDirectory(destAnimationDir);
    string[] imgFiles = Directory.EnumerateFiles(srcAnimationDir, "*.png", SearchOption.AllDirectories).ToArray();
    Rect rect = FindMaxBoundingRect(imgFiles);
    /*
    using Image bitmap = Image.FromFile(imgFiles[0]);
    using Graphics graphics = Graphics.FromImage(bitmap);
    graphics.DrawRectangle(Pens.Red,new Rectangle(rect.X,rect.Y,rect.Width,rect.Height));
    bitmap.Save(Path.Combine(destAnimationDir, "result.png"));*/
    foreach(string imgFile in imgFiles)
    {
        string destImgFile = Path.Combine(destAnimationDir, Path.GetFileName(imgFile));
        using var srcMat = Cv2.ImRead(imgFile,ImreadModes.Unchanged);
        using var rectMat = srcMat[rect];//截取矩形区域
        using var resizedMat = rectMat.Resize(new Size(rectMat.Size().Width / 4, rectMat.Size().Height / 4));//缩放为原来的1/4
        Cv2.ImWrite(destImgFile, resizedMat);
    }
}