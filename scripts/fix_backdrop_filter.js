var fso = new ActiveXObject('Scripting.FileSystemObject');
function processFolder(folder) {
    var files = new Enumerator(folder.Files);
    for (; !files.atEnd(); files.moveNext()) {
        var file = files.item();
        var ext = file.Name.substring(file.Name.lastIndexOf('.')).toLowerCase();
        if (ext === '.html' || ext === '.css') {
            var text = file.OpenAsTextStream(1, -1).ReadAll();
            var original = text;
            text = text.replace(/(^[ \t]*)backdrop-filter: blur\(10px\);/mg, '$1-webkit-backdrop-filter: blur(10px);\n$1backdrop-filter: blur(10px);');
            text = text.replace(/(^[ \t]*)backdrop-filter: blur\(5px\);/mg, '$1-webkit-backdrop-filter: blur(5px);\n$1backdrop-filter: blur(5px);');
            text = text.replace(/(^[ \t]*)backdrop-filter: blur\(12px\);/mg, '$1-webkit-backdrop-filter: blur(12px);\n$1backdrop-filter: blur(12px);');
            text = text.replace(/(^[ \t]*)backdrop-filter: blur\(15px\);/mg, '$1-webkit-backdrop-filter: blur(15px);\n$1backdrop-filter: blur(15px);');
            if (text !== original) {
                var out = file.OpenAsTextStream(2, -1);
                out.Write(text);
                out.Close();
            }
        }
    }
    var subfolders = new Enumerator(folder.SubFolders);
    for (; !subfolders.atEnd(); subfolders.moveNext()) {
        processFolder(subfolders.item());
    }
}
processFolder(fso.GetFolder(fso.GetAbsolutePathName('.')));
