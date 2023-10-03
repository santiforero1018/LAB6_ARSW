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
            const bluePrints = data.map(function(bp){
                return {name: bp.name, points: bp.points.length};
            });

            $('.table').children().remove();
            // $('.table').toogleClass('table-hover');
            
            $('.table').append('<tr><th>BluePrintName</th><th>TotalPoints</th><th>Show</th></tr>');

            var i = 0;
            bluePrints.map(function (info) {
                const newRow = $('<tr>');
                newRow.append('<td class="bpname">' + info.name + '</td>');
                newRow.append('<td>' + info.points + '</td>');
                newRow.append('<td><button class="draw" onclick="appModule.getABluePrint('+i+')">Show</button></td>');
                $('.table').append(newRow);
                i++;
            });

            // console.log(bluePrints[0].points);
            const totalPoints = data.reduce((acc, bluePrint) => acc + bluePrint.points.length, 0);
            $('#total').text(totalPoints);
        });
    }

    function getABluePrint(index){
        const bpname = $('td.bpname')[index].innerText;
        console.log($('td.bpname')[index].innerText);
        apimock.getBlueprintsByNameAndAuthor(author, bpname, function(data){
            var bluePrint = data;
            console.log(bluePrint.name, bluePrint.points);
            $('#selected').text(bpname);
            var canvas = document.getElementById("paint");
            console.log(canvas);
            var c = canvas.getContext("2d");
            c.clearRect(0, 0, canvas.width, canvas.height);
            // c.beginPath();
            c.strokeStyle = "white";
            // c.lineWidth = 2;
            bluePrint.points.forEach(function (point, index) {
                if (index === 0) {
                    c.moveTo(point.x, point.y);
                    console.log("Start "+point.x +" "+point.y);
                } else {
                    c.lineTo(point.x, point.y);
                    console.log("Continue "+point.x +" "+point.y);
                }
            });
            c.stroke();
        });
    }

    


    return {
        setAuthorName,
        getAuthorName,
        getBluePrints,
        getABluePrint
    }


})();