(function() {

    // var selector = "span.b-leaf-ipaddr";
    var selectors = ["span","td"];

    var collectedIPs = {};

    debugger;

    var IpRe = /\d+\.\d+\.\d+\.\d+/i;

    var alreadyLooking = " looking for location..."

    function ipInside(element) {
      var txt = element.textContent
      return (txt.indexOf(alreadyLooking) < 0) && txt.match(IpRe)
    }

    function exists(collection, predicate) {
      for (i = 0; i < collection.length; i++) if (predicate(collection[i])) return true
      return false
    }

    function ipFound(element) {
      var ip = ipInside(element)
      return  ip && !exists(element.children, ipInside) && ip
    }

    for (var i = 0; i < selectors.length; i++) {
      var selector = selectors[i]
      $(selector).each(function(ind, el) {
        var ip = ipFound(el)
        if (ip) {
            el.textContent = el.textContent + " looking for location...";
            if (!collectedIPs[ip]) {
                collectedIPs[ip] = [];
            }
            collectedIPs[ip].push(el);
        }
      });
    }

    for (ip in collectedIPs) {

        (function(ip) {

            var els = collectedIPs[ip];

            $.ajax({
                type: "GET",
                url: "http://lentascope.net/ip/" + ip,
                success: function(geo_info){
                    for (var i = 0; i < els.length; i++) {
                        els[i].textContent = "(" + ip + "), " + geo_info + "";
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    for (var i = 0; i < els.length; i++) {
                       els[i].textContent = "(" + ip + ") (no geo data)"
//                       console.println("(from " + ip + "), " + textStatus + ":" + errorThrown)
                    }
                }
            });

        })(ip);

    }
   
 }

)();
