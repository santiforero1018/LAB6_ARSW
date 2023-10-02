appModule = (function () {
    let author = '';

    function setAuthorName() {
        author = $('#theInput').val();
    }

    function getAuthorName() {
        return author;
    }

    function getBluePrints(){
        apimock.getBlueprintsByAuthor(author, function(data){
            const bluePrints = data.map(function(blueprint){
                return {name: blueprint.name, points: blueprint.points.length};
            });

            $('.table').empty();
            // $('.table').toogleClass('.table-hover');
            $('.table').append('<tr><th>BluePrintName</th><th>TotalPoints</th></tr>');

            bluePrints.forEach(function (info) {
                const newRow = $('<tr>');
                newRow.append('<td>' + info.name + '</td>');
                newRow.append('<td>' + info.points + '</td>');
                $('.table').append(newRow);
            });
        });
    }

    


    return {
        setAuthorName,
        getAuthorName,
        getBluePrints
    }


})();