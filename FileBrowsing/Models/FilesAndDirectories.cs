using System.Collections.Generic;

namespace FileBrowsing.Models
{
    public class FilesAndDirectories
    {
        public List<PathForFilesAndDirectories> Directories = new List<PathForFilesAndDirectories>();
        public List<PathForFilesAndDirectories> Files = new List<PathForFilesAndDirectories>();

        public PathForFilesAndDirectories CurrentPath { get; set; }
    }
}