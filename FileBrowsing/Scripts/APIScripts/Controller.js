app.controller('APIController', function ($scope, APIService) {
    getDrivers();
    $scope.IsClickEnable = true;

    function getDrivers() {

        document.getElementById("showNumbers").style.display = "none";

        $scope.LessTenMb = "";
        $scope.TenFiftyMb = "";
        $scope.MoreOneHundredMb = "";
        $scope.backButton = "";

        var getCall = APIService.getDrivers();

        getCall.then(function (d) {
            $scope.directories = d.data.Directories;
            $scope.files = d.data.Files;
        }, function (error) {
            $log.error('Oops! Something went wrong.')
        })
    }

    $scope.GetDirectoriesAndFiles = function (path) {

        $scope.backButton = "...";
        document.getElementById("showNumbers").style.display = "inline";
        window.location.hash = "back"; 

        var pathForFunction = {
            path: path
        };

        var getDirectoriesAndFiles = APIService.GetDirectoriesAndFiles(pathForFunction);

        getDirectoriesAndFiles.then(function (d) {
            $scope.currentDirectory = d.data.CurrentPath.path;
            $scope.directories = d.data.Directories;
            $scope.files = d.data.Files;

            $scope.LessTenMb = "click \"Show numbers of files\" button ";
            $scope.TenFiftyMb = "click \"Show numbers of files\" button ";
            $scope.MoreOneHundredMb = "click \"Show numbers of files\" button ";

        }, function (error) {
            console.log('Oops! Something went wrong.');
        })

    }

     $scope.GetNumbersOfFiles = function (path) {

         $scope.IsClickEnable = false;

         $scope.LessTenMb = "please wait...";
         $scope.TenFiftyMb = "please wait...";
         $scope.MoreOneHundredMb = "please wait...";

        var pathForFunction = {
            path: path
        };

        var numberOfFiles = APIService.GetNumbers(pathForFunction)

        numberOfFiles
            .then(function (d) {
                    $scope.LessTenMb = d.data.LessTenMb;
                    $scope.TenFiftyMb = d.data.TenFiftyMb;
                    $scope.MoreOneHundredMb = d.data.MoreOneHundredMb;

                    $scope.IsClickEnable = true;
             
            }, function (error) {
                console.log('Oops! Something went wrong');

                $scope.LessTenMb = "error";
                $scope.TenFiftyMb = "error";
                $scope.MoreOneHundredMb = "error";

                $scope.IsClickEnable = true;
            });
     };

     document.getElementById("backButton").onclick = function () {
         if ($scope.IsClickEnable === true) {
             window.history.back();
         }
     }

     window.onhashchange = function (e) {

         if ($scope.IsClickEnable === true) {

             if (window.location.hash === "#" || window.location.hash === "") {

                 var currentDirectory = document.getElementById("currentDirectoryHeading").innerHTML;
                 var lastIndexOfSlash = currentDirectory.lastIndexOf("\\");
                 currentDirectory = currentDirectory.substring(0, currentDirectory.lastIndexOf("\\", lastIndexOfSlash - 1));

                 if (currentDirectory.length == 2) {
                     currentDirectory += '\\';
                 }
                 if (currentDirectory == "") {
                     getDrivers();
                     $scope.currentDirectory = "";
                 } else {
                     $scope.GetDirectoriesAndFiles(currentDirectory);
                 }

             }
         }
    }


})
