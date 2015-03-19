(function() {

    // var selector = "span.b-leaf-ipaddr";
    var selector = "span";

    var collectedIPs = {};

    $(selector).each(function(ind, span) {
        var re = /\d+\.\d+\.\d+\.\d+/i;
        var found = span.textContent.match(re);
        if (found) {
            span.textContent = span.textContent + " address search in progress ... ";
            var ip = found[0];
            if (!collectedIPs[ip]) {
                collectedIPs[ip] = [];
            }
            collectedIPs[ip].push(span);
        }
    });

    for (ip in collectedIPs) {

        (function(ip) {

            var spans = collectedIPs[ip];

            $.ajax({
                type: "GET",
                url: "http://lentascope.net/ip/" + ip,
                success: function(geo_info){
                    for (var i = 0; i < spans.length; i++) {
                        spans[i].textContent = "(from " + ip + ", " + geo_info + ")";
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    for (var i = 0; i < spans.length; i++) {
                        spans[i].textContent = "(from " + ip + "), " + textStatus + ":" + errorThrown;
                    }
                }
            });

        })(ip);

    }
   
 }

)();
