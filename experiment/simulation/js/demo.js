/* This  script file is edited by
    Piyali Chattopadhyay
    Project Scientist-Technical,
    Virtual Labs IIT Kharagpur.*/



jsPlumb.ready(function () {

    var instance,
        discs = [],

        addDisc = function (evt) {
            var info = createDisc();
            var e = prepare(info.id);
            instance.draggable(info.id);
            discs.push(info.id);
            evt.stopPropagation();
            evt.preventDefault();
        },

        reset = function (e) {
            for (var i = 0; i < discs.length; i++) {
                var d = document.getElementById(discs[i]);
                if (d) d.parentNode.removeChild(d);
            }
            discs = [];
            e.stopPropagation();
            e.preventDefault();
        },

        initAnimation = function (elId) {
            var el = document.getElementById(elId);

            instance.on(el, 'click', function (e, ui) {
                if (el.className.indexOf("jsPlumb_dragged") > -1) {
                    jsPlumb.removeClass(elId, "jsPlumb_dragged");
                    return;
                }
                var o = instance.getOffset(el, true),
                    o2 = instance.getOffset(el),
                    s = jsPlumb.getSize(el),
                    pxy = [e.pageX || e.clientX, e.pageY || e.clientY],
                    c = [pxy[0] - (o.left + (s[0] / 2)), pxy[1] - (o.top + (s[1] / 2))],
                    oo = [c[0] / s[0], c[1] / s[1]],
                    DIST = 350,
                    l = o2.left + (oo[0] * DIST),
                    t = o2.top + (oo[1] * DIST);

                var id = el.getAttribute("id");
                instance.animate(el, {left: l, top: t}, { duration: 350, easing: 'easeOutBack' });
            });
        },

    // notice there are no dragOptions specified here, which is different from the
    // draggableConnectors2 demo.  all connections on this page are therefore
    // implicitly in the default scope.
	// for all live red connection//
        endpoint = {
            anchors: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 5, stroke: "#C50806" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 100,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare = function (elId) {
            initAnimation(elId);            			
			
            return instance.addEndpoint(elId, endpoint);
					},
					///black wire
	endpoint_ground = {
            anchor: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 5, stroke: "black" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 10,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare_ground = function (elId) {
            initAnimation(elId);            			
			
            return instance.addEndpoint(elId, endpoint_ground);
					},
					
			endpoint_blue = {
            anchor: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 5, stroke: "#55DEF6" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 10,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare_blue = function (elId) {
            initAnimation(elId);            			
			
            return instance.addEndpoint(elId, endpoint_blue);
					},

				endpoint_grey = {
            anchor: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 2, stroke: "#C1C3C4" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 10,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare_grey = function (elId) {
            initAnimation(elId);            			
			
            return instance.addEndpoint(elId, endpoint_grey);
					},	

    // this is overridden by the YUI demo.
        createDisc = function () {
            var d = document.createElement("div");
            d.className = "bigdot";
            document.getElementById("animation-demo").appendChild(d);
            var id = '' + ((new Date().getTime()));
            d.setAttribute("id", id);
            var w = screen.width - 162, h = screen.height - 162;
            var x = (0.2 * w) + Math.floor(Math.random() * (0.5 * w));
            var y = (0.2 * h) + Math.floor(Math.random() * (0.6 * h));
            d.style.top = y + 'px';
            d.style.left = x + 'px';
            return {d: d, id: id};
        };

    // get a jsPlumb instance, setting some appropriate defaults and a Container.
    instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'wait', zIndex: 20 },
        Endpoint: [ "Image", { url: "./images/littledot.png" } ],
        Connector: [ "Bezier", { curviness:-20 } ],
        Container: "canvas"
    });
	
	


    // suspend drawing and initialise.
    instance.batch(function () {
        var e1 = prepare("bd1"),            
            e2 = prepare_ground("bd2"),
			/*e3 = prepare("bd3"),
            e4 = prepare_blue("bd4"),
			e5 = prepare_blue("bd5"),*/
			e6 = prepare("bd6"),
			e7 = prepare("bd7"),            
            e8 = prepare("bd8"),
			e9 = prepare("bd9"),
            e10 = prepare_grey("bd10"),
			e11= prepare("bd11"),
			e12 = prepare_ground("bd12"),
            e13 = prepare("bd13"),
			e14= prepare_ground("bd14"),			
			e15 = prepare("bd15"),
			e16 = prepare_ground("bd16"),
			e17 = prepare("bd17"),
			e18 = prepare("bd18"),
			e19 = prepare_ground("bd19");
			e20 = prepare("bd20"),
			e21 = prepare_ground("bd21"),
			e22 = prepare("bd22"),
			e23 = prepare("bd23"),
			e24 = prepare_grey("bd24");
			
			
             instance.connect({ source: e10, target: e24 });
			 //instance.connect({ source: e1, target: e13 });
			// instance.connect({ source: e2, target: e14 });
			 
			 //delete clicked connection
      instance.bind("click", function (conn, originalEvent) {
		  
            if (((conn.sourceId=='bd13' && conn.targetId=='bd18' && document.getElementById('partchk').value == 1)|| (conn.sourceId=='bd18' && conn.targetId=='bd13' && document.getElementById('partchk').value == 1)) && confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) {////for k2 opening
               instance.deleteConnection(conn);
			   TimePeriod();
			}
			else if (((conn.sourceId=='bd13' && conn.targetId=='bd18' && document.getElementById('partchk').value == 2)|| (conn.sourceId=='bd18' && conn.targetId=='bd13' && document.getElementById('partchk').value == 2)) && confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) {////for k2 opening
               instance.deleteConnection(conn);
			   criticalDamping();
			}

			else if (((conn.sourceId=='bd13' && conn.targetId=='bd18' && document.getElementById('partchk').value == 3)|| (conn.sourceId=='bd18' && conn.targetId=='bd13' && document.getElementById('partchk').value == 3)) && confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) {////for k2 opening
               instance.deleteConnection(conn);
			   TimePeriod();
			   transients();
			}
			
		 else  {			 
               instance.deleteConnection(conn);
			         }
		
   
        }); 

   


    });
	
	
      document.getElementById("check").addEventListener("click", function () {
        var correct_connections_10_24 = [///common connection
            {
                "source": "bd10",
                "target": "bd24"
            },

            {
                "source": "bd24",
                "target": "bd10"
            }
        ];
		
		var correct_connections_9_7 = [
            {
                "source": "bd9",
                "target": "bd7"
            },

            {
                "source": "bd7",
                "target": "bd9"
            }
        ];

        var correct_connections_8_11 = [
            {
                "source": "bd8",
                "target": "bd11"
            },

            {
                "source": "bd11",
                "target": "bd8"
            }
        ];        

        var correct_connections_17_7 = [
            {
                "source": "bd17",
                "target": "bd7"
            },
    
            {
                "source": "bd7",
                "target": "bd17"
            }
        ];

        var correct_connections_6_16 = [
            {
                "source": "bd6",
                "target": "bd16"
            },

            {
                "source": "bd16",
                "target": "bd6"
            }
        ];

        var correct_connections_12_21 = [
            {
                "source": "bd12",
                "target": "bd21"
            },

            {
                "source": "bd21",
                "target": "bd12"
            }
        ];
        
		var correct_connections_13_18 = [
            {
                "source": "bd13",
                "target": "bd18"
            },

            {
                "source": "bd18",
                "target": "bd13"
            }
        ];
		var correct_connections_14_22 = [
            {
                "source": "bd14",
                "target": "bd22"
            },

            {
                "source": "bd22",
                "target": "bd14"
            }
        ];
		
		var correct_connections_14_16 = [
            {
                "source": "bd14",
                "target": "bd16"
            },

            {
                "source": "bd16",
                "target": "bd14"
            }
        ];
		
		var correct_connections_17_22 = [
            {
                "source": "bd17",
                "target": "bd22"
            },

            {
                "source": "bd22",
                "target": "bd17"
            }
        ];
		var correct_connections_15_17 = [
            {
                "source": "bd15",
                "target": "bd17"
            },

            {
                "source": "bd17",
                "target": "bd15"
            }
        ];
		var correct_connections_16_23 = [
            {
                "source": "bd16",
                "target": "bd23"
            },

            {
                "source": "bd23",
                "target": "bd16"
            }
        ];
		var correct_connections_19_20 = [
            {
                "source": "bd19",
                "target": "bd20"
            },

            {
                "source": "bd20",
                "target": "bd19"
            }
        ];
		var correct_connections_1_7 = [
            {
                "source": "bd1",
                "target": "bd7"
            },

            {
                "source": "bd7",
                "target": "bd1"
            }
        ];
		var correct_connections_2_11 = [
            {
                "source": "bd2",
                "target": "bd11"
            },

            {
                "source": "bd11",
                "target": "bd2"
            }
        ];
		
		
		
		
		
		
		
		
		
		
		
		
				
		       //a connection outside this will invalidate the circuit
        var allowed_connections = [
            {
                "source": "bd10",
                "target": "bd24"
            },
    
            {
                "source": "bd24",
                "target": "bd10"
            },
			
			{
                "source": "bd9",
                "target": "bd7"
            },
    
            {
                "source": "bd7",
                "target": "bd9"
            },
            
            {
                "source": "bd8",
                "target": "bd11"
            },

            {
                "source": "bd11",
                "target": "bd8"
            },

            {
                "source": "bd17",
                "target": "bd7"
            },
    
            {
                "source": "bd7",
                "target": "bd17"
            },
			
			{
                "source": "bd6",
                "target": "bd16"
            },

            {
                "source": "bd16",
                "target": "bd6"
            },
			
            {
                "source": "bd12",
                "target": "bd21"
            },

            {
                "source": "bd21",
                "target": "bd12"
            },
			
			{
                "source": "bd13",
                "target": "bd18"
            },

            {
                "source": "bd18",
                "target": "bd13"
            },
			{
                "source": "bd14",
                "target": "bd22"
            },

            {
                "source": "bd22",
                "target": "bd14"
            },
			
			{
                "source": "bd14",
                "target": "bd16"
            },

            {
                "source": "bd16",
                "target": "bd14"
            },
			
			{
                "source": "bd17",
                "target": "bd22"
            },

            {
                "source": "bd22",
                "target": "bd17"
            },
			
			{
                "source": "bd15",
                "target": "bd17"
            },

            {
                "source": "bd17",
                "target": "bd15"
            },
			
			{
                "source": "bd16",
                "target": "bd23"
            },

            {
                "source": "bd23",
                "target": "bd16"
            },
			
			{
                "source": "bd19",
                "target": "bd20"
            },

            {
                "source": "bd20",
                "target": "bd19"
            },
			{
                "source": "bd1",
                "target": "bd7"
            },

            {
                "source": "bd7",
                "target": "bd1"
            },
			{
                "source": "bd2",
                "target": "bd11"
            },

            {
                "source": "bd11",
                "target": "bd2"
            },

        ];

        var actual_connections = instance.getAllConnections();

				var is_connected_10_24 = false;
				var is_connected_9_7 = false;
				var is_connected_8_11 = false;
				var is_connected_17_7 = false;
				var is_connected_6_16 = false;
				var is_connected_12_21 = false;
				var is_connected_13_18 = false;
				var is_connected_14_22 = false;
				var is_connected_15_17 = false;
				var is_connected_16_23 = false;
				var is_connected_19_20 = false;
				var is_connected_14_16 = false;
				var is_connected_17_22 = false;
				var is_connected_1_7 = false;
				var is_connected_2_11 = false;
				
				
				
        var unallowed_connection_present = false;
        var count =0; // counts number of connection


        actual_connections.forEach(function (connection) {
            count++;
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_10_24){
                is_connected_10_24 = correct_connections_10_24.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                  });
            }

            if(!unallowed_connection_present){
                unallowed_connection_present = !(allowed_connections.find(function (conn) {
                    return (conn.source === this_connection.source && conn.target === this_connection.target);
                }));
            }
            // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false

        });

        //checking for 3_7 connection
        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_9_7){
                is_connected_9_7 = correct_connections_9_7.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_8_11){
                is_connected_8_11 = correct_connections_8_11.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_17_7){
                is_connected_17_7 = correct_connections_17_7.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_6_16){
                is_connected_6_16 = correct_connections_6_16.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_12_21){
                is_connected_12_21 = correct_connections_12_21.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_13_18){
                is_connected_13_18 = correct_connections_13_18.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
	actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_14_22){
                is_connected_14_22 = correct_connections_14_22.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_15_17){
                is_connected_15_17 = correct_connections_15_17.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_16_23){
                is_connected_16_23 = correct_connections_16_23.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_19_20){
                is_connected_19_20 = correct_connections_19_20.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_14_16){
                is_connected_14_16 = correct_connections_14_16.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_17_22){
                is_connected_17_22 = correct_connections_17_22.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_1_7){
                is_connected_1_7 = correct_connections_1_7.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
		actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_2_11){
                is_connected_2_11 = correct_connections_2_11.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });	
		
			
			///output 	
		///series
        if (is_connected_10_24 && is_connected_9_7 && is_connected_8_11 && is_connected_17_7 && is_connected_6_16 && is_connected_12_21 && is_connected_13_18 && is_connected_14_22 && is_connected_15_17 && is_connected_16_23 && is_connected_19_20 && !is_connected_14_16 && !is_connected_17_22 && !is_connected_1_7 && !is_connected_2_11 && !unallowed_connection_present ) {
			            
			document.getElementById('partchk').value = 1;
			
			alert('Right Connection\n Series circuit');
			//document.getElementById('myTable1').style.visibility ="visible";
           }
		   
		else if (is_connected_10_24 && is_connected_9_7 && is_connected_8_11 && is_connected_17_7 && is_connected_6_16 && is_connected_12_21 && is_connected_13_18 && is_connected_17_22 && is_connected_14_16 && is_connected_15_17 && is_connected_16_23 && is_connected_19_20 && !is_connected_14_22 && !is_connected_1_7 && !is_connected_2_11 && !unallowed_connection_present ) {
			            
			document.getElementById('partchk').value = 2;
			
			alert('Right Connection\n Parallel circuit');
			
           }
		   
		else if (is_connected_10_24 && !is_connected_9_7 && !is_connected_8_11 && is_connected_17_7 && is_connected_6_16 && is_connected_12_21 && is_connected_13_18 && is_connected_14_22 && is_connected_15_17 && is_connected_16_23 && is_connected_19_20 && !is_connected_14_16 && !is_connected_17_22 && is_connected_1_7 && is_connected_2_11 && !unallowed_connection_present ) {
			            
			document.getElementById('partchk').value = 4;
			
			alert('Right Connection\n Series circuit for frequency response');
			//document.getElementById('myTable1').style.visibility ="visible";
           }
		   
			else{
				alert("Wrong Connection\n Go through the procedure again");
			}
			
		///deviation signal	
			
		

    });
});


	
	
	
	
	
	
	
	
	
	
	
	
	
	







