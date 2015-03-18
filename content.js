(function doReplace() {

    $("span.b-leaf-ipaddr").each(function(ind, span) {
        var re = /\d+\.\d+\.\d+\.\d+/i;
        var found = span.textContent.match(re);
        if (found) {

            span.textContent = span.textContent + " address search in progress ... ";

            var ip = found[0];

            $.ajax({
                type: "GET",
                url: "http://lentascope.net/ip/" + ip,
                success: function(msg){
                    span.textContent = "(from " + ip + ", " + msg + ")";
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.error(textStatus);
                    span.textContent = "(from " + ip + "), " + textStatus + ":" + errorThrown;
                }
            });
        }
    });

 }

)();