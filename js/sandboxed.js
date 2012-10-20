var Ctrl = function($scope) {
    $scope.title = "";
    $scope.private = false;
    $scope.gist = false;
    $scope.tweet = false;
    $scope.tags = [{name: "", versions: []}];

    $scope.addTag = function() {
        $scope.tags.push({name: "", versions: []});
    };

    $scope.removeTag = function(tag) {
        if($scope.tags.length <= 1) return;
        $scope.tags.some(function(_tag, i) {
            if(tag === _tag) {
                $scope.tags.splice(i, 1);
                return true;
            }
        })
    };

    $scope.share = function() {
        if(!$scope.form.$valid) return;
        var tags = [];

        $scope.tags.forEach(function(tag) {
            var t = {};
            t.name = tag.name;
            if(tag.versions.length) t.versions = tag.versions;

            tags.push(t);
        });
        parent.postMessage({
            title: $scope.title,
            private: $scope.private,
            gist: $scope.gist,
            tweet: $scope.tweet,
            tags: tags
        }, "*");
    };
};