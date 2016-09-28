using FileBrowsing.Models;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace FileBrowsing.Controllers
{
    public class BrowserController : ApiController
    {
        public FilesAndDirectories Get()
        {
            string[] drivers = System.Environment.GetLogicalDrives();
            
            var filesAndDirectories = new FilesAndDirectories();

            foreach (var dr in drivers)
            {
                System.IO.DriveInfo di = new System.IO.DriveInfo(dr);

                if (di.IsReady)
                {
                    filesAndDirectories.Directories.Add(new PathForFilesAndDirectories() { path = di.Name });
                }
            }

            return filesAndDirectories;
        }

        public FilesAndDirectories Post(PathForFilesAndDirectories path)
        {
            var filesAndDirectories = new FilesAndDirectories();

            if (path.path.Last() != '\\')
            {
                path.path += "\\";
            }

            filesAndDirectories.CurrentPath = new PathForFilesAndDirectories() { path = path.path };

            try {
                foreach (var directory in Directory.EnumerateDirectories(path.path))
                {
                    filesAndDirectories.Directories.Add(new PathForFilesAndDirectories()
                    {
                        path = directory.Remove(directory.IndexOf(filesAndDirectories.CurrentPath.path), filesAndDirectories.CurrentPath.path.Length).Replace(@"\", "")
                    });

                }

                foreach (var file in Directory.EnumerateFiles(path.path))
                {
                    filesAndDirectories.Files.Add(new PathForFilesAndDirectories()
                    {
                        path = file.Remove(file.IndexOf(filesAndDirectories.CurrentPath.path), filesAndDirectories.CurrentPath.path.Length).Replace(@"\", "")
                    });
                }
            }
            catch {}

            return filesAndDirectories;
        }

        public NumbersOfFiles Put(PathForFilesAndDirectories path)
        {
            NumbersOfFiles numberOfFiles = new NumbersOfFiles() { LessTenMb = 0, TenFiftyMb = 0, MoreOneHundredMb = 0 };
            countFiles(path.path, numberOfFiles);
            return numberOfFiles;
        }   

        private void countFiles(string path, NumbersOfFiles numbersOfFiles)
        {
            try
            {
                var files = Directory.GetFiles(path);
                for (int i = 0; i < files.Count(); i++)
                {

                    FileInfo info = new FileInfo(files[i]);

                    if (info.Length / 1000000 >= 100)
                    {
                        numbersOfFiles.MoreOneHundredMb += 1;
                    }
                    else if (info.Length / 1000000 > 10 && info.Length / 1000000 <= 50)
                    {
                        numbersOfFiles.TenFiftyMb += 1;
                    }
                    else if (info.Length / 1000000 < 10)
                    {
                        numbersOfFiles.LessTenMb += 1;
                    }
                }

                var directories = Directory.GetDirectories(path);
                for (int i = 0; i < directories.Count(); i++)
                {
                    try
                    {
                        countFiles(directories[i], numbersOfFiles);
                    }
                    catch
                    {

                    }
                }
            }
            catch { }
        }

    }
}
