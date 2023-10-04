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
            
            
            
            $('.table').find('td').remove();
            
            
            var i = 0;
            bluePrints.map(function (info) {
                const newRow = $('<tr>');
                newRow.append('<td class="bpname">' + info.name + '</td>');
                newRow.append('<td>' + info.points + '</td>');
                newRow.append('<td><button class="draw" onclick="appModule.getABluePrint('+i+')">Show</button></td>');
                $('.table').append(newRow);
                i++;
            });

            
            const totalPoints = data.reduce((acc, bluePrint) => acc + bluePrint.points.length, 0);
            $('#total').text(totalPoints);
        });
    }

    function getABluePrint(index){
        
        const bpname = $('td.bpname').eq(index).text();
        
        apimock.getBlueprintsByNameAndAuthor(author, bpname, function(data){
            var bluePrint = data;
            
            $('#selected').text(bpname);
            var canvas = document.getElementById("paint");
          
            var c = canvas.getContext("2d");
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.beginPath();
            c.strokeStyle = "red";
            c.lineWidth = 5;
            bluePrint.points.forEach(function (point, index) {
                if (index === 0) {
                    c.moveTo(point.x,point.y);
                    
                } else {
                    c.lineTo(point.x, point.y);
                    
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