app.service("APIService", function ($http) {

    this.GetNumbers = function (pathForFunction) {
        return $http(
        {
            method: 'put',
            data: pathForFunction,
            url: 'api/Browser'
        });
    }

    this.getDrivers = function () {
        return $http.get("api/Browser")
    }

    this.GetDirectoriesAndFiles = function (pathForFunction) {
        return $http(
        {
            method: 'post',
            data: pathForFunction,
            url: 'api/Browser'
        });
    }

});

