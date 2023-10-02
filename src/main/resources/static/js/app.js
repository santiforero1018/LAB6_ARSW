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

            $('.table').children().remove();
            // $('.table').toogleClass('table-hover');
            
            $('.table').append('<tr><th>BluePrintName</th><th>TotalPoints</th></tr>');

            bluePrints.map(function (info) {
                const newRow = $('<tr>');
                newRow.append('<td>' + info.name + '</td>');
                newRow.append('<td>' + info.points + '</td>');
                $('.table').append(newRow);
            });

            // console.log(bluePrints[0].points);
            const totalPoints = data.reduce((acc, bluePrint) => acc + bluePrint.points.length, 0);
            $('#total').text(totalPoints);
        });



    }

    


    return {
        setAuthorName,
        getAuthorName,
        getBluePrints
    }


})();