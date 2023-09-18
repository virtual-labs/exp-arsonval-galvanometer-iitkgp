 
   /* This HTML page and script files are developed by
    Piyali Chattopadhyay
    Project Scientist-Technical,
    Virtual Labs IIT Kharagpur.*/ 

window.alert('Desktop or Laptop view is preferable. \n Rotate your screen For better view ')

///////////oscilloscope and Function generator VARIABLES GLOBAL/////////////////////////////////////////////////////////////	
var canvas,ctx;
var flag;
var axes = {};
var vmaxs;  //in volt
var tmaxs; // in msec  0.001; //in sec
var voltperdiv,timeperdiv,peak,ss;	
var voltperdiv1,voltperdiv2,vmaxs1,vmaxs2;
var vp;
var posy1;
var posy2;
var phsl;
var frqfng;



//////////////////////////////////////OSCILLOSCOPE AND Function GENERATOR KNOBS//////////////////////////////////////////////

$(document).ready(function () {
//------------------------------knob of frequency(hz)----------------------//
    $("#fq-knob-fng").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min: 0.1,
        max: 15,
        step: 0.1,
		angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsin();
				
            }
            if (flag == 2) {
				drawsinout();                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}

    });
    //-----------------------knob of amplitude(volt)-------------------------------//
    $("#amp-knob-fng").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
       width: 100,
        height: 80,
        // cursor: pointer,
        min: 1,
        max: 5,
        step: 1,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsin();
				
            }
            if (flag == 2) {
				drawsinout();
                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}

    });
	
	
//-----------------------knob of amplitude1(vmax/div)-------------------------------//
    $("#amp-knob1").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        // cursor: pointer,
       min: 0.1,
        max: 5,
        step: 0.1,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsin();
				
            }
            
          if(flag==3){
			dual();	
			}
			
			}
    });
    //-----------------------knob of amplitude2(vmax/div)-------------------------------//
    $("#amp-knob2").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        // cursor: pointer,
       min: 0.1,
        max: 5,
        step: 0.1,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            
            if (flag == 2) {
				drawsinout();
                 
            }

          if(flag==3){
			dual();	
			}
			
			}

    });
	
	 $("#fq-knob").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:100,
        max:1000,
        step:100,
        angleOffset: -125,
        angleArc: 250,
        'change': function (v) {
            if (flag == 1) {
                drawsin();
				
            }
            if (flag == 2) {
				drawsinout();
                 
            }

          if(flag==3){
				
			}
			if(flag==4){
			   
			}
			}
    });
	
	$("#positiony1").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:-5,
        max:5,
        step:0.1,
        angleOffset: -125,
        angleArc: 250,
        
    });
	
	$("#positiony2").knob({
        readOnly: false,
        fgColor: '#157DA4', //'#999999',
        bgColor: '#bbd0f7', //'#dcdcdc',
        width: 100,
        height: 80,
        //cursor: pointer,
        min:-5,
        max:5,
        step:0.1,
        angleOffset: -125,
        angleArc: 250,
        
    });
	
});	


///////////////////OSCILLOSCOPE SWITCH ON-OFF///////////////////////////////////
	
function mainswt() {
    var bttn = document.getElementById('onff').value;
	
	
    if (bttn == "Off") {

        document.getElementById("onff").value = "On";
		var canvas = document.getElementById('mycanvas');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		document.getElementById("sqr").disabled = true;
        document.getElementById("sqrout").disabled = true;
		
        document.getElementById("in").disabled = true;
        document.getElementById("out").disabled = true;
        document.getElementById("inout").disabled = true;
        	
        //document.getElementById("clear").disabled = false;
		document.getElementById('onff').classList.remove("btn-sucess");
        document.getElementById('onff').classList.add("btn-danger");
		
		
        		
        }
    else {
        document.getElementById("onff").value = "Off";
        document.getElementById("sqr").disabled = false;
        document.getElementById("sqrout").disabled = true; 
		
        //document.getElementById("in").disabled = false;
        //document.getElementById("out").disabled = false;
        //document.getElementById("inout").disabled = false;
		
		//document.getElementById("clear").disabled = true;
		document.getElementById('onff').classList.remove("btn-danger");
		document.getElementById('onff').classList.add("btn-success");
		
		
		
        drawAxis();
        drawGrid(ctx);

    }
}

////////////////////////////////////OSCILLOSCOPE GRID DRAW///////////////////////////////////////
function drawAxis() {

    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

   voltperdiv1 = document.getElementById("amp-knob1").value;
   vmaxs1 = parseFloat(voltperdiv1)*4;//volt 
  voltperdiv2 = document.getElementById("amp-knob2").value;
  vmaxs2 = parseFloat(voltperdiv2)*4;//volt 

    axes.x0 = 0.5 + 0.0 * canvas.width;//260.5
    axes.y0 = 0.5 + 0.5 * canvas.height;//175.5
    // axes.scale = 50;
    axes.xscale = (canvas.width) / ( tmaxs); 	// x pix per s//260000
   
    axes.N = 101;
     if(flag==1){
          axes.yscale = (canvas.height) / (2 * vmaxs1);    // y pix per V //87.5
     }
     if(flag==2){
         axes.yscale = (canvas.height) / (2 * vmaxs2);    // y pix per V //87.5
     }
    if(flag==3){
         axes.yscale = (canvas.height) / (2 * vmaxs1);    // y pix per V //87.5
         axes.yscale = (canvas.height) / (2 * vmaxs2);    // y pix per V //87.5
     }
    axes.doNegativeX = true;
    ctx.lineWidth = 0.5;
    ctx.lineWidth = ticklinewidth;
    ctx.strokeStyle = tickcolor;

    drawHorizontalAxis();
    drawVerticalAxis();
    drawVerticalAxisTicks();
    drawHorizontalAxisTicks();
}

function drawGrid(ctx) {

    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    ctx.beginPath();//added afterwards
    for (var x = 0; x < w; x += 43.5) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }

    for (var y = 0; y < h; y += 44) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.strokeStyle = "Gainsboro";
    ctx.stroke();
}

var axismargin = 30,
        axisorigin = {x: 0, y: 0},
        axisright = 520,
        horzntickspcng = 9,
        vrtcltickspcng = 9,
        axiswidth = axisright, //520
        axisheight = axisorigin.y, //350
        numofvrtcltick = axisheight / vrtcltickspcng, //175
        numofhorzntick = axiswidth / horzntickspcng, //57.77777777777778
        tickwidth = 10,
        ticklinewidth = 0.5,
        tickcolor = 'black',
        axislinewidth = 1.0,
        axiscolor = 'lightgray';
//alert(numofvrtcltick);
//------------------------------------------------------Horizontal Axis----------------------------------------------------------------------------------//
function drawHorizontalAxis() {
//axes.y0=175.5,w=520
    var y0 = axes.y0, w = ctx.canvas.width;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(0, y0);
    ctx.lineTo(w, y0);  // X axis
    ctx.stroke();

}
//------------------------------------------------------Vertical Axis------------------------------------------------------------------------------------//          
function drawVerticalAxis() {
//axes.x0=260.5,h=350
    var x0 = axes.x0+218, h = ctx.canvas.height;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, h);  // Y axis
    ctx.stroke();

}
//-------------------------------------------------------Vertical Ticks--------------------------------------------------------------------------------//         
function drawVerticalAxisTicks() {
    var deltaX;//5

    for (var i = 1; i < 43; ++i) {
        ctx.beginPath();

        if (i % 5 === 0)
            deltaX = tickwidth / 3;
        else
            deltaX = tickwidth / 3;

        ctx.moveTo(axisorigin.x + 218 - deltaX,
                axisorigin.y + 1 + i * vrtcltickspcng);

        ctx.lineTo(axisorigin.x + 218 + deltaX,
                axisorigin.y + 1 + i * vrtcltickspcng);
        ctx.stroke();

    }
}
//-------------------------------------------------------Horizontal Ticks----------------------------------------------------------------------------------//     
function drawHorizontalAxisTicks() {
    var deltaY;//5

    for (var i = 1; i < numofhorzntick; ++i) {
        ctx.beginPath();

        if (i % 5 === 0)
            deltaY = tickwidth / 3;
        else
            deltaY = tickwidth / 3;

        ctx.moveTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y + 350 - 175 - deltaY);

        ctx.lineTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y + 350 - 175 + deltaY);

        ctx.stroke();
    }

}

//////////////////////////OSCILLOSCOPE SIGNAL POSITIONNING FOR INPUT SQUARE WAVE APPLICABLE TO ALL CONTROLLERS///////////////////////////	
	
//----------------------------------------Channel 1------------------------------------------------------------//

function posiy1chnge() {
    posy1 = document.getElementById("positiony1").value;
    if (flag == 1) {
        drawsin();
    }
   
}
function posiy2chnge() {
    posy2 = document.getElementById("positiony2").value;
   
 if (flag == 2) {
        drawsinout();
    } 
}

function posix2chnge() {
    phsl = document.getElementById("positionx").value;
    if (flag == 1) {
        drawsin();
    }
    if (flag == 2) {
           drawsinout();
    }
 
}

function ampfng() {
    vp = document.getElementById("amp-knob-fng").value;
    if (flag == 1) {
        drawsin();
    }
    if (flag == 2) {
          drawsinout();
    }
if(flag==3){
        dual();
    }
    /*if(flag==4){
       grndrc();
    }*/
    
}

function freqfng() {
    frqfng = document.getElementById("fq-knob-fng").value;
    if (flag == 1) {
        drawsin();
    }
    if (flag == 2) {
          drawsinout();
    }

   if(flag==3){
        dual();
    }
    /*if(flag==4){
       grndrc();
    }*/
}

function amp1pdiv()
{
     voltperdiv = document.getElementById("amp-knob1").value;
     vmaxs = parseFloat(voltperdiv)*4;//volt 

    if (flag == 1) {
        drawsin();
    }
     if (flag == 2) {
        drawsinout();
    }

   if(flag==3){
        dual();
    }
    
}
function amp2pdiv()
{
     voltperdiv = document.getElementById("amp-knob2").value;
     vmaxs = parseFloat(voltperdiv)*4;//volt 

    if (flag == 1) {
        drawsin();
    }
     if (flag == 2) {
        drawsinout();
    }

   if(flag==3){
        dual();
    }
    
}
//------------------------------------------------timeperdiv(ms/div)--------------------------------------------------------//
function timepdiv() {
    timeperdiv = document.getElementById("fq-knob").value ;
	tmaxs =parseFloat(timeperdiv)*10*Math.pow(10,-3); //1sec
   if (flag == 1) {
        drawsin();
    }
    if (flag == 2) {
        drawsinout();
    }
if(flag==3){
        dual();
    }
    
}

///////////////////////////////////////////SQUARE WAVE GENERATE///////////////////////////////////////////////////////////////////////////////
//----------------------------------------code for drawing square wave--------------------------------------------------//
function drawsin() {
    canvas = document.getElementById("mycanvas");
	//document.getElementById('fq-knob-fng').value = "15400";
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
		 document.getElementById("sqrout").disabled = false;
		 //document.getElementById('sqr').disabled="true";
		 //document.getElementById('tr1').style.display="none";
		 //document.getElementById('tr2').style.display="block";
		document.getElementById("in").disabled = false;
        document.getElementById("out").disabled = false;
        document.getElementById("inout").disabled = false;
    drawGrid(ctx);
    drawAxis();
	
	
    sinwv();
	frqRes();
}

function sinwv() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Sine wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = (vp/2) *  Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180);
		
		
		//console.log('i/p ='+y[i]);
    }
	
	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#0059b3";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();

}


///////////////////////////////////////////SQUARE OUTPUT WAVE GENERATE///////////////////////////////////////////////////////////////////////////////
//----------------------------------------code for drawing square output wave--------------------------------------------------//
function drawsinout() {
    canvas = document.getElementById("mycanvas");
	if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
		 ;
		 //document.getElementById('sqr').disabled="true";
		 //document.getElementById('tr1').style.display="none";
		 //document.getElementById('tr2').style.display="block";
		document.getElementById("in").disabled = false;
        document.getElementById("out").disabled = false;
        document.getElementById("inout").disabled = false;
    drawGrid(ctx);
    drawAxis();
	
	if(document.getElementById('partchk').value == 4){
	frqRes();
	
	///oscilloscope amplitude show or output wave showing
	
	vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
	posy2 = document.getElementById("positiony2").value;
    tmaxs= document.getElementById("fq-knob").value*10*Math.pow(10,-3);
//---------------------------------------------------------Sine wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 1;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = (OsAmp/2) *  Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180);
		
		
		//console.log('i/p ='+y[i]);
    }
	
	
    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#0059b3";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {
//if(x[i]>=0.06){
	
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
ctx.lineTo(520,yp);
    ctx.stroke();
	
	
	}
}

///light switch on-off

function light_OnOff() {
    var sw = document.getElementById('red_sw');
	var mcb = document.getElementById('mcb');
	
    if (sw.src.match ("images/switch_off.png") && mcb.src.match("images/mcb_on.jpg")) {

        document.getElementById('red_sw').src = "images/switch_on.png";
		document.getElementById('ray').style.display = "block";
		document.getElementById('bloomDot').style.display = "block";
		document.getElementById('plant').src = "images/lightedgalvanometer.png";
		if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	else if(document.getElementById('partchk').value == 4){
		frqRes();
	}
        }
		
	else if(sw.src.match ("images/switch_off.png") && mcb.src.match("images/mcb_off.jpg")){
		alert('Power on first \n Click on the mcb');	
			
		}
    else  {
        document.getElementById("red_sw").value = "off";
		document.getElementById('red_sw').src = "images/switch_off.png";
        document.getElementById('ray').style.display = "none";
		document.getElementById('bloomDot').style.display = "none";
		document.getElementById('plant').src = "images/galvanometer.png";
		document.getElementById('sw3').src = "images/k3.png";
		TimePeriodRev();
		}
}
function mcbOn_Off(){
	
	var mcb = document.getElementById('mcb');
	var sw = document.getElementById('red_sw');
	
	if (mcb.src.match("images/mcb_off.jpg") && sw.src.match("images/switch_off.png")) {

       	document.getElementById('mcb').src = "images/mcb_on.jpg";
		document.getElementById('knob1').style['pointer-events'] = "auto";
		document.getElementById('knob2').style['pointer-events'] = "auto";
		document.getElementById('knob3').style['pointer-events'] = "auto";
		document.getElementById('knob4').style['pointer-events'] = "auto";
		document.getElementById('knob5').style['pointer-events'] = "auto";
		document.getElementById('knob6').style['pointer-events'] = "auto";
		document.getElementById('knob7').style['pointer-events'] = "auto";
		document.getElementById('knob8').style['pointer-events'] = "auto";
		document.getElementById('knob9').style['pointer-events'] = "auto";
		document.getElementById('knob10').style['pointer-events'] = "auto";
		document.getElementById('knob11').style['pointer-events'] = "auto";
		document.getElementById('knob12').style['pointer-events'] = "auto";	
		
        }
	else if(mcb.src.match("images/mcb_on.jpg") && sw.src.match("images/switch_off.png")) {
		
        document.getElementById('mcb').src = "images/mcb_off.jpg";
        document.getElementById('knob1').style['pointer-events'] = "none";
		document.getElementById('knob2').style['pointer-events'] = "none";
		document.getElementById('knob3').style['pointer-events'] = "none";
		document.getElementById('knob4').style['pointer-events'] = "none";
		document.getElementById('knob5').style['pointer-events'] = "none";
		document.getElementById('knob6').style['pointer-events'] = "none";
		document.getElementById('knob7').style['pointer-events'] = "none";
		document.getElementById('knob8').style['pointer-events'] = "none";
		document.getElementById('knob9').style['pointer-events'] = "none";
		document.getElementById('knob10').style['pointer-events'] = "none";
		document.getElementById('knob11').style['pointer-events'] = "none";
		document.getElementById('knob12').style['pointer-events'] = "none";
		
    }
	
	else if (sw.src.match("images/switch_on.png") && mcb.src.match("images/mcb_on.jpg")) {

        alert('Switch off the light first');
		
        }	
			
}

function Removek3(){
if(document.getElementById('sw3').src.match('images/k3.png')){	
document.getElementById('sw3').src = 'images/k3_keyRemoved.png';

}	
	
}
///series circuit
var dcm,E1,Ig,I1; /// Globally declared variable, cause it is used in two functions simultaneously, depicting the theta deflection on linear scale in cm
function Mathmodel_part1(){

var E= 2;///2 v dc supply
var G= math.divide(2.218,1000);//math.divide(1.75,1000);///Galvanometer Constant
var C = math.multiply(82.44,math.pow(10,-9));///Restoring Constant
var a = math.multiply(2.66,math.pow(10,-9));///Movement of inertia 

var P = document.getElementById('pValue').value;
//alert('P='+P);
var Q = document.getElementById('qValue').value;
//alert('Q='+Q);
var R = document.getElementById('rValue').value;
//alert('R='+R);
var Rc = 70;///coil resistance from lab test
var Rs = 30;///critical resistance
//var Rg = parseFloat(52.77);///Galvanometer internal resistance when R=0 ,from back calculation

var deno= math.add(P,Q);
//alert('deno='+deno);
if(P == 0 ){
 E1=0;
 }

else{
 E1 = math.divide(math.multiply(E,P),deno);
}
//alert('E1='+E1);

 Ig = math.divide(E1,math.add(R,Rc));
//alert('Ig='+Ig);	

var theta = (math.divide(math.multiply(G,Ig),C)).toPrecision(2);///theta is in rad now,steadystate theta
//alert('theta='+theta);

var cond_theta = math.multiply(2,theta);
var cond_thetadegree = math.divide(math.multiply(cond_theta,180),math.pi);

//alert('theta in degree='+cond_thetadegree);
//if(math.multiply(2,thetadegree)<=10.00 && P!=0 ){
	
if(cond_thetadegree <=10.00 ){	
 dcm = math.add(math.multiply(theta ,200),0);///+2 is the virtual offset coming
 //alert('first');
}

//else if (math.multiply(2,thetadegree)>10.00 && P!=0 )	{
	else if (cond_thetadegree >10.00)	{
	dcm = math.add(math.multiply(math.tan(math.multiply(theta,2)),100),0);///-2 is the virtual offset coming,thats why we have added +2;
	//alert('2nd');
}

else if(P == 0){
	dcm=0;
}
//alert('dcm='+dcm);
}

///parrel circuit

function Mathmodel_part2(){

var E= 2;///2 v dc supply
var G= math.divide(2.218,1000);///Galvanometer Constant
var C = math.multiply(82.44,math.pow(10,-9));///Restoring Constant
var a = math.multiply(2.66,math.pow(10,-9));///Movement of inertia 

var P = document.getElementById('pValue').value;
//alert('P='+P);
var Q = document.getElementById('qValue').value;
//alert('Q='+Q);
var R = document.getElementById('rValue').value;
//alert('R='+R);
var Rc = 70;///coil resistance from lab test
var Rs = 30;///critical resistance
//var Rg = parseFloat(52.77);///Galvanometer internal resistance when R=0 ,from back calculation

var deno= math.add(P,Q);
//alert('deno='+deno);
if(P == 0 ){
 E1=0;
 }

else{
 E1 = math.divide(math.multiply(E,P),math.add(P,Q));
}

//alert('E1='+E1);

//alert('Req='+Req);

if(document.getElementById('rValue').value !=0){
var Req = math.divide(math.multiply(R,Rc),math.add(R,Rc));

  I1 = math.divide(E1,Req);
  Ig = math.multiply(I1,math.divide(R,math.add(R,Rc)));
}
else if(document.getElementById('rValue').value ==0){
 I1 = math.divide(E1,Rc);
Ig = I1; 
}
 //alert('I1='+I1);
 
//alert('Ig='+Ig);	
var theta = (math.divide(math.multiply(G,Ig),C)).toPrecision(2);///theta is in rad now
var cond_theta = math.multiply(2,theta);
var cond_thetadegree = math.divide(math.multiply(cond_theta,180),math.pi);

//alert('theta in degree='+cond_thetadegree);
//if(math.multiply(2,thetadegree)<=10.00 && P!=0 ){
	
if(cond_thetadegree <=10.00 ){	
 dcm = math.add(math.multiply(theta ,200),0);///+2 is the virtual offset coming
 //alert('first');
}

//else if (math.multiply(2,thetadegree)>10.00 && P!=0 )	{
	else if (cond_thetadegree >10.00)	{
	dcm = math.add(math.multiply(math.tan(math.multiply(theta,2)),100),0);///-2 is the virtual offset coming,thats why we have added +2;
	//alert('2nd');
}

else if(P == 0){
	dcm=0;
}
//alert('dcm='+dcm);
}


var pointPos = null;
function movepoint(){
	
	if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 3 ){
	Mathmodel_part1();
	}
	if(document.getElementById('partchk').value == 2){
	Mathmodel_part2();
	}
	
	
  var point = document.getElementById("bloomDot");   
  var pos = math.round(49.5);//340;               //0 cm or center position or initial position 
  
  clearInterval(pointPos);
  pointPos = setInterval(condition, 20);
  var nxtpos = math.round(math.add(pos,math.multiply(2,dcm)));///1.82
  //alert(nxtpos);
  function condition() {
    if (pos == nxtpos) {
      clearInterval(pointPos);
	  //alert('entered');
    } else {
      pos++; 
      //elem.style.top = pos + 'px'; 
      point.style.left = pos + '%'; 
	  //alert('not entered');
    }
  }
}		

///Time period oscillation

/*function TimePeriod(){
document.getElementById('bloomDot').style.display="block";	
var E= 2;///2 v dc supply
var G= math.divide(1.75,1000);///Galvanometer Constant
var C = math.multiply(7.38,math.pow(10,-8));///Restoring Constant
var a = math.multiply(3.163,math.pow(10,-9));///Movement of inertia
var D = math.multiply(5,math.pow(10,-6));///damping coefficient

var P = document.getElementById('pValue').value;
//alert('P='+P);
var Q = document.getElementById('qValue').value;
//alert('Q='+Q);	
	
///since R is opened R= 0 now.

 Ig = math.divide(E,math.add(P,Q));	
var thetaf_rad = (math.divide(math.multiply(G,Ig),C)).toPrecision(2);///theta is in rad now

for(var t=0; t<=10; t++){
	
var wn = math.sqrt(math.divide(C,a));
var zeta = math.divide(D,math.multiply(2,math.sqrt(math.multiply(a,C))));

var theta =	parseFloat(thetaf_rad*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));



var theta_degree = math.divide(math.multiply(theta,180),math.pi);

if(math.multiply(2,theta_degree)<=10.00 && P!=0 ){
	
 dcm = math.add(math.multiply(theta ,200),2);///+2 is the virtual offset coming
}

else if (math.multiply(2,theta_degree)>10.00 && P!=0 )	{
	
	dcm = math.add(math.multiply(math.tan(math.multiply(theta,2)),100),2);///-2 is the virtual offset coming,thats why we have added +2;
}

else if(P == 0){
	dcm=0;
}	
	
////////////////code for bloom point oscillation///////////////////
 
   var point = document.getElementById('bloomDot');
    var relativePos ;
	var pos = math.round(49.5);

 var currentPos=point.style.left;


 var temp=currentPos;

var nxtpos2 = math.round(math.add(pos,math.multiply(2,dcm)));////declaring the px position wrt origin

(nxtpos2>temp)? tempIncrmnt():tempDecrmnt();

function tempIncrmnt(){
	 
	clearInterval(pointPos);
  pointPos = setInterval(condition, 20);
 
  function condition() {
    if (temp == nxtpos2) {
      clearInterval(pointPos);
	  //alert('entered');
    } else {
      temp++; 
      //elem.style.top = pos + 'px'; 
      point.style.left = temp + '%'; 
	  //alert('not entered');
    }
  }
	
	
}

function tempDecrmnt(){
	
clearInterval(pointPos);
  pointPos = setInterval(condition, 20);
 
  function condition() {
    if (temp == nxtpos2) {
      clearInterval(pointPos);
	  //alert('entered');
    } else {
     temp--; 
      //elem.style.top = pos + 'px'; 
      point.style.left = temp + '%'; 
	  //alert('not entered');
    }
  }
	
	
}


}		
	
}*/	
///in series circuit time period needed	
function TimePeriod(){
	
document.getElementById('bloomDot').classList.add("glow1");	
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow2");
	   },500);
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow3");
	   },1000);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow4");
	   },1500);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow5");
	   },2000);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow6");
	   },2500);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow7");
	   },3000);	   
	   	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow8");
	   },3500);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow9");
	   },4000);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow10");
	   },4500);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow11");
	   },5000);

setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow12");
	   },5500);

setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow13");
	   },6000);

setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow14");
	   },6500);

setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow15");
	   },7000);


setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow16");
	   },7500);

setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow17");
	   },8000);

setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow18");
	   },8500);

setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow19");
	   },9000);

setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow20");
	   },9500);

setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glow21");
	   },10000);
   	
}	
	
function TimePeriodRev(){
	
document.getElementById('bloomDot').classList.remove("glow1");
		   document.getElementById('bloomDot').classList.remove("glow2");
		   document.getElementById('bloomDot').classList.remove("glow3");
		   document.getElementById('bloomDot').classList.remove("glow4");
		   document.getElementById('bloomDot').classList.remove("glow5");
		   document.getElementById('bloomDot').classList.remove("glow6");
		   document.getElementById('bloomDot').classList.remove("glow7");
		   document.getElementById('bloomDot').classList.remove("glow8");
		   document.getElementById('bloomDot').classList.remove("glow9");
		   document.getElementById('bloomDot').classList.remove("glow10");
		   document.getElementById('bloomDot').classList.remove("glow11");
		   document.getElementById('bloomDot').classList.remove("glow12");
		   document.getElementById('bloomDot').classList.remove("glow13");
		   document.getElementById('bloomDot').classList.remove("glow14");
		   document.getElementById('bloomDot').classList.remove("glow15");
		   document.getElementById('bloomDot').classList.remove("glow16");
		   document.getElementById('bloomDot').classList.remove("glow17");
		   document.getElementById('bloomDot').classList.remove("glow18");
		   document.getElementById('bloomDot').classList.remove("glow19");
		   document.getElementById('bloomDot').classList.remove("glow20");
		   document.getElementById('bloomDot').classList.remove("glow21");
}	


///in parallel circuit critical damping  is needed


var root = document.documentElement;
function criticalDamping(){
	
//alert('hi'); 	
var E= 2;///2 v dc supply
var G= math.multiply(2.218,math.pow(10,-3));///Galvanometer Constant
var C = math.multiply(82.44,math.pow(10,-9));///Restoring Constant
var a = math.multiply(2.66,math.pow(10,-9));///Movement of inertia


var P = document.getElementById('pValue').value;
//alert('P='+P);
var Q = document.getElementById('qValue').value;
//alert('Q='+Q);	
	
var R = document.getElementById('rValue').value;

var Rc = 70;///coil resistance from lab test
var Rs = 90;///external resistance
var D = math.divide(math.pow(G,2),math.add(Rc,R));///Damping coefficient
//var Rg = parseFloat(52.77);///Galvanometer internal resistance when R=0 ,from back calculation

var deno= math.add(P,Q);
//alert('deno='+deno);
if(P == 0 ){
 E1=0;
 }

else{
 E1 = math.divide(math.multiply(E,P),math.add(P,Q));
}
//alert('E1='+E1);

 Ig = math.divide(E1,math.add(R,Rc));
//alert('Ig='+Ig);	
var thetaf_rad = (math.divide(math.multiply(G,Ig),C)).toPrecision(2);///theta is in rad now

var zeta = math.divide(D,math.multiply(2,math.sqrt(math.multiply(a,C))));
//alert('zeta='+zeta);

var wn = math.sqrt(math.divide(C,a));
//alert('wn='+wn);

if(zeta < 1){///under damped motion

for(var t=0;t<=10;t++){
var theta =	parseFloat(thetaf_rad*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
//var theta = math.multiply(thetaf,math.subtract(1,math.multiply(math.pow(math.e,-(math.multiply(wn,t))),math.add(1,math.multiply(wn,t)))));
console.log('under damped theta='+theta);
Ud_Osci();
root.style.setProperty('--change', nxtpos2 + "%");
rev_Ud_Osci(); 
}
}

if(zeta == 1){///critical damping

for(var t=0;t<=10;t++){	
var theta =	math.multiply(thetaf_rad,math.subtract(1,math.multiply(math.pow(math.e,-math.multiply(wn,t)),math.add(1,math.multiply(wn,t)))));
//console.log('critical damped theta='+theta);
	
}
	
}

if(zeta > 1){///over damping

for(var t=0;t<=10;t++){
	
var commonroot = math.sqrt(math.subtract(math.pow(zeta,2),1));
	
var root2 = math.add(zeta,commonroot);
	
var root1 = math.subtract(zeta,commonroot);
	
var commondeno = math.multiply(2,commonroot);	
	
var eroot1 = math.pow(math.e,-math.multiply(wn,t,root1));

var eroot2 = math.pow(math.e,-math.multiply(wn,t,root2));
	
var scndprt = math.multiply(math.divide(root2,commondeno),eroot1);

var thrdprt = math.multiply(math.divide(root1,commondeno),eroot2);

var multiplier = math.add(1,math.subtract(scndprt,thrdprt));

var theta =	math.multiply(thetaf_rad,multiplier);

//console.log('over damped theta='+theta);

}
}

///theta condition applied

var cond_theta = math.multiply(2,theta);
var cond_thetadegree = math.divide(math.multiply(cond_theta,180),math.pi);

//alert('theta in degree='+cond_thetadegree);
//if(math.multiply(2,thetadegree)<=10.00 && P!=0 ){
	
if(cond_thetadegree <=10.00 ){	
 dcm = math.add(math.multiply(theta ,200),0);///+2 is the virtual offset coming
 //alert('first');
}

//else if (math.multiply(2,thetadegree)>10.00 && P!=0 )	{
	else if (cond_thetadegree >10.00)	{
	dcm = math.add(math.multiply(math.tan(math.multiply(theta,2)),100),0);///-2 is the virtual offset coming,thats why we have added +2;
	//alert('2nd');
}

else if(P == 0){
	dcm=0;
}
//alert('dcm='+dcm);

var point = document.getElementById('bloomDot');	
var pos = math.round(49.5);
var nxtpos2 = math.round(math.add(pos,math.multiply(2,dcm)));
point.style.left = nxtpos2 + '%';

}


function Ud_Osci(){
	
document.getElementById('bloomDot').classList.add("glowu1");	
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glowu2");
	   },1000);
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glowu3");
	   },2000);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glowu4");
	   },3000);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glowu5");
	   },4000);	   
	   
setTimeout(function(){
		   document.getElementById('bloomDot').classList.add("glowu6");
	   },5000);	
	
//clearTimeout(50);	
	
	
}
function rev_Ud_Osci(){
	
		   document.getElementById('bloomDot').classList.remove("glowu1");	

		   document.getElementById('bloomDot').classList.remove("glowu2");

		   document.getElementById('bloomDot').classList.remove("glowu3");

		   document.getElementById('bloomDot').classList.remove("glowu4");

		   document.getElementById('bloomDot').classList.remove("glowu5");

		   document.getElementById('bloomDot').classList.remove("glowu6");

	
}

///Finding transient response

function exp1(){
document.getElementById('partchk').value = 1;

document.getElementById('result1').style.display = "block";	
document.getElementById('result2').style.display = "block";
document.getElementById('result3').style.display = "none";
document.getElementById('result4').style.display = "none";		
}

function exp2(){
document.getElementById('partchk').value = 3;

document.getElementById('result3').style.display = "block";
document.getElementById('result1').style.display = "none";
document.getElementById('result2').style.display = "none";
document.getElementById('result4').style.display = "block";
//Mathmodel_part1();	
}

function exp3(){
document.getElementById('partchk').value = 4;

document.getElementById('result4').style.display = "none";	
document.getElementById('result1').style.display = "none";
document.getElementById('result2').style.display = "none";
document.getElementById('result3').style.display = "block";
document.getElementById('sfp4').style.visibility = "visible";
//document.getElementById('onff').disabled = false;

}



function transients(){///when open circuit fig1,4 acc. manual
	
	var dataOPPoints=[];///plot section for testing
	
var E= 2;///2 v dc supply
var G= math.divide(2.218,1000);///Galvanometer Constant
var C = math.multiply(82.44,math.pow(10,-9));///Restoring Constant
var a = math.multiply(2.66,math.pow(10,-9));///Movement of inertia	
var af = document.getElementById('partchk').value;
var transi =new Array;
var Rc = 70;

var P = document.getElementById('pValue').value;
//alert('P='+P);
var Q = document.getElementById('qValue').value;
//alert('Q='+Q);	
	
var R = document.getElementById('rValue').value;
//alert('R='+R);

var D = math.divide(math.pow(G,2),math.add(Rc,10000));///Damping coefficient when open circuit

var deno= math.add(P,Q);
//alert('deno='+deno);
if(P == 0 ){
 E1=0;
 }

else{
 E1 = math.divide(math.multiply(E,P),deno);
}
//alert('E1='+E1);

 Ig = math.divide(E1,math.add(R,Rc));
 //alert('Ig='+Ig);
 
var thetaf_rad = (math.divide(math.multiply(G,Ig),C));///theta is in rad now,steady state theta
//alert('thetaf='+thetaf_rad);

var zeta = math.divide(D,math.multiply(2,math.sqrt(math.multiply(a,C))));
//alert('zeta='+zeta);

var wn = math.sqrt(math.divide(C,a));
//alert('wn='+wn);

///under damped motion

for(var t=0;t<=100;t++){
//transi[t] =	parseFloat(thetaf_rad*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));

var theta =	parseFloat(thetaf_rad*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));
	
//var theta = math.multiply(thetaf,math.subtract(1,math.multiply(math.pow(math.e,-(math.multiply(wn,t))),math.add(1,math.multiply(wn,t)))));

console.log('under damped theta='+theta);

//document.getElementById('theta1').value = transi[2];	
//document.getElementById('theta2').value =	transi[3];	

dataOPPoints.push({x:(t), y:(theta)});
}

///theta condition applied

var cond_theta = math.multiply(2,theta);
var cond_thetadegree = math.divide(math.multiply(cond_theta,180),math.pi);

//alert('theta in degree='+cond_thetadegree);
//if(math.multiply(2,thetadegree)<=10.00 && P!=0 ){
	
if(cond_thetadegree <=10.00 ){	
 dcm = math.add(math.multiply(theta ,200),0);///+2 is the virtual offset coming
 //alert('first');
}

//else if (math.multiply(2,thetadegree)>10.00 && P!=0 )	{
	else if (cond_thetadegree >10.00)	{
	dcm = math.add(math.multiply(math.tan(math.multiply(theta,2)),100),0);///-2 is the virtual offset coming,thats why we have added +2;
	//alert('2nd');
}

else if(P == 0){
	dcm=0;
}
//alert('dcm='+dcm);





document.getElementById('plotbucket').style.display  = "block";
document.getElementById('chartContainer').style.display  = "none"; 
document.getElementById('chartContainer_trans').style.display  = "block"; 
	
	var chart = new CanvasJS.Chart("chartContainer_trans",
    {
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Transient Response (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude(v)",
			
			//maximum:0.03,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	
	document.getElementById("exportChart").style.display = "none";
	document.getElementById("exportChart_trans").style.display = "block";
	document.getElementById("exportChart_trans").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	


	
}	

///during part3 of the experiment i.e. transients,due to the value of R zeta may be either overdamped or underdamped hence two conditions said.

var rootR = document.documentElement;
var rootRs = document.documentElement;
function transients_short(){///when k2 closed circuit fig1,5 acc. manual
	
	var dataOPPoints=[];///plot section for testing
	
var E= 2;///2 v dc supply
var G= math.divide(2.218,1000);///Galvanometer Constant
var C = math.multiply(82.44,math.pow(10,-9));///Restoring Constant
var a = math.multiply(2.66,math.pow(10,-9));///Movement of inertia	
var af = document.getElementById('partchk').value;
var transi =new Array;
var Rc = 70;
var delzero = document.getElementById('dampR').value;

var P = document.getElementById('pValue').value;
//alert('P='+P);
var Q = document.getElementById('qValue').value;
//alert('Q='+Q);	
	
var R = document.getElementById('rValue').value;
//alert('R='+R);

///var D = math.divide(math.pow(G,2),math.add(Rc,8000)); ///Damping coefficient when open circuit

var deno= math.add(P,Q);
//alert('deno='+deno);
if(P == 0 ){
 E1=0;
 }

else{
 E1 = math.divide(math.multiply(E,P),deno);
}
//alert('E1='+E1);

 Ig = math.divide(E1,math.add(R,Rc));
 //alert('Ig='+Ig);
 
var thetaf_rad = (math.divide(math.multiply(G,Ig),C));///theta is in rad now,steady state theta
//alert('thetaf='+thetaf_rad);
if(R!=0){
var zeta = math.add(delzero , math.divide(math.divide(math.pow(G,2),R),math.multiply(2, math.sqrt(math.multiply(a,C)))));
//alert('zeta='+zeta);
}
if(R==0){
var D = math.divide(math.pow(G,2),math.add(Rc,R));///Damping coefficient	
var zeta = math.divide(D,math.multiply(2,math.sqrt(math.multiply(a,C))));	
}
var wn = math.sqrt(math.divide(C,a));
//alert('wn='+wn);
if(zeta < 1){
///under damped motion

for(var t=0;t<=100;t++){

var theta =	parseFloat(thetaf_rad*(1-(((Math.exp(-(parseFloat(zeta*wn*t))))/(Math.sqrt(1-(parseFloat(Math.pow(zeta,2))))))*Math.sin(parseFloat(Math.sqrt(1-parseFloat(Math.pow(zeta,2)))*wn*t)+Math.acos(zeta)))));

console.log('under damped theta='+theta);
trans_osci();
revtrans_osci();

rootR.style.setProperty('--change2', nxt + "%");

rootRs.style.setProperty('--change3', nxtpos2 + "%");

dataOPPoints.push({x:(t), y:(theta)});
}
}

if(zeta > 1){///over damping

for(var t=0;t<=10;t++){
	
var commonroot = math.sqrt(math.subtract(math.pow(zeta,2),1));
	
var root2 = math.add(zeta,commonroot);
	
var root1 = math.subtract(zeta,commonroot);
	
var commondeno = math.multiply(2,commonroot);	
	
var eroot1 = math.pow(math.e,-math.multiply(wn,t,root1));

var eroot2 = math.pow(math.e,-math.multiply(wn,t,root2));
	
var scndprt = math.multiply(math.divide(root2,commondeno),eroot1);

var thrdprt = math.multiply(math.divide(root1,commondeno),eroot2);

var multiplier = math.add(1,math.subtract(scndprt,thrdprt));

var theta =	math.multiply(thetaf_rad,multiplier);

console.log('over damped theta='+theta);

}
}

if(zeta == 1){///critical damping

for(var t=0;t<=10;t++){	
var theta =	math.multiply(thetaf_rad,math.subtract(1,math.multiply(math.pow(math.e,-math.multiply(wn,t)),math.add(1,math.multiply(wn,t)))));
//console.log('critical damped theta='+theta);
	
}
	
}

///theta condition applied

var cond_theta = math.multiply(2,theta);
var cond_thetadegree = math.divide(math.multiply(cond_theta,180),math.pi);

//alert('theta in degree='+cond_thetadegree);
//if(math.multiply(2,thetadegree)<=10.00 && P!=0 ){
	
if(cond_thetadegree <=10.00 ){	
 dcm = math.add(math.multiply(theta ,200),0);///+2 is the virtual offset coming
 //alert('first');
}

//else if (math.multiply(2,thetadegree)>10.00 && P!=0 )	{
	else if (cond_thetadegree >10.00)	{
	dcm = math.add(math.multiply(math.tan(math.multiply(theta,2)),100),0);///-2 is the virtual offset coming,thats why we have added +2;
	//alert('2nd');
}

else if(P == 0){
	dcm=0;
}
//alert('dcm='+dcm);
if(R!=0){
///del calculation
document.getElementById('dampR2').value = zeta;
}
///point movement
var point = document.getElementById('bloomDot');	
var pos = math.round(49.5);
var nxtpos2 = math.round(math.add(pos,math.multiply(2,dcm)));
var nxt = math.add(nxtpos2,math.multiply(nxtpos2,0.05));
point.style.left = nxtpos2 + '%';



///plot
if(zeta<1){
document.getElementById('plotbucket').style.display  = "block"; 
document.getElementById('chartContainer').style.display  = "none"; 
document.getElementById('chartContainer_trans').style.display  = "block"; 
	
	var chart = new CanvasJS.Chart("chartContainer_trans",
    {
      animationEnabled: true,
		  animationDuration: 10000, 
	  title:{
      text: "Transient Response (v vs. sec) "
	  
      },
	  
	  axisX:{
        interlacedColor: "#B2F9FA",
        title: "Time(Sec)"
      },
    axisY: [
	      {/////output Y axis
            title: "Amplitude(rad)",
			interval: 0.001,
			//maximum:0.03,
        },
		
		],
	data: [
      {        
        type: "spline",
		color:"109DB6",
        dataPoints:dataOPPoints
	
       },
       
      ]	
	});

	chart.render();	
	
	document.getElementById("exportChart").style.display = "none";
	document.getElementById("exportChart_trans").style.display = "block";
	document.getElementById("exportChart_trans").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	

}
	
}

function trans_osci(){
document.getElementById('bloomDot').classList.add("glowtr1");	
setTimeout(function(){
document.getElementById('bloomDot').classList.add("glowtr2");
	   },1000);
	   	
	
	
}
function revtrans_osci(){
	
document.getElementById('bloomDot').classList.remove("glowtr1");	
document.getElementById('bloomDot').classList.remove("glowtr2");	
	
}



///frequency responce

var OsAmp,Oscm,pos1,pos2;
var rootf1 = document.documentElement;
var rootf2 = document.documentElement;
function frqRes(){///when k2 closed circuit fig1,5 acc. manual
	
	var dataOPPoints=[];///plot section for testing
	
var E= 2;///2 v dc supply
var G= math.divide(2.218,1000);///Galvanometer Constant
var C = math.multiply(82.44,math.pow(10,-9));///Restoring Constant
var a = math.multiply(2.66,math.pow(10,-9));///Movement of inertia	
var af = document.getElementById('partchk').value;
var transi =new Array;
var Rc = 70;
var delzero = document.getElementById('dampR').value;

var P = document.getElementById('pValue').value;
//alert('P='+P);
var Q = document.getElementById('qValue').value;
//alert('Q='+Q);	
	
var R = document.getElementById('rValue').value;
//alert('R='+R);

///var D = math.divide(math.pow(G,2),math.add(Rc,8000)); ///Damping coefficient when open circuit

var deno= math.add(P,Q);
//alert('deno='+deno);
if(P == 0 ){
 E1=0;
 }

else{
 E1 = math.divide(math.multiply(E,P),deno);
}
//alert('E1='+E1);

 Ig = math.divide(E1,math.add(R,Rc));
 //alert('Ig='+Ig);
 
var thetaf_rad = (math.divide(math.multiply(G,Ig),C));///theta is in rad now,steady state theta
//alert('thetaf='+thetaf_rad);
if(R!=0){
var zeta = math.add(delzero , math.divide(math.divide(math.pow(G,2),R),math.multiply(2, math.sqrt(math.multiply(a,C)))));
//alert('zeta='+zeta);
}
if(R==0){
var D = math.divide(math.pow(G,2),math.add(Rc,R));///Damping coefficient	
var zeta = math.divide(D,math.multiply(2,math.sqrt(math.multiply(a,C))));	
}
document.getElementById('dampR2').value = zeta;

var thetaf_rad = (math.divide(math.multiply(G,Ig),C));///theta is in rad now,steady state theta

var fr = document.getElementById('fq-knob-fng').value;
var omega = math.multiply(2, math.pi, fr);
var omega2 = math.pow(omega,2);

var omega_n = document.getElementById('wn4').value;
var omega_n2 = math.pow(omega_n,2);

var dr = document.getElementById('dampR2').value;

var fpart = math.pow(math.subtract(1,math.divide(omega2,omega_n2)),2);

var spart = math.pow(math.divide(math.multiply(2,dr,omega),omega_n),2);

var denomV = math.add(fpart,spart);
	
var denom = math.sqrt(denomV);	
	
OsAmp = math.divide(1,denom);///oscillation amplitude in cm	

Oscm = math.multiply(thetaf_rad,200,OsAmp);

var pos =math.round(49.5);
 pos1 = math.round(math.add(pos,math.multiply(2,Oscm)));
 pos2 = math.round(math.subtract(pos,math.multiply(2,Oscm)));
frq_osci();

//rootf1.style.setProperty('--change4', pos1 + "%");

//rootf2.style.setProperty('--change5', pos2 + "%");


}
var left2 = 50;
var goLeft2 = false;
	var goRight2 = true;
var temp2=left2;
var fpoint;	
function frq_osci(){
/*document.getElementById('bloomDot').classList.add('glowfr1');	
setTimeout(function(){
document.getElementById('bloomDot').classList.add("glowfr2");
	   },500);*/

fpoint = setInterval(movefp, 30); 	   
	   
}	   
	   
	   
function movefp(){	   
if(goRight2) {
			
			temp2++;
			if(temp2 == pos1) { /* move right*/
				goRight2 = false;
				goLeft2 = true;
				
			}
		} else if(goLeft2) {
			//goLeft1=false;
			temp2--;
			if(temp2 == pos2) { /* move left */
				goLeft2 = false;
				goRight2 = true;
				
			}
		}
		document.getElementById('bloomDot').style.left = temp2+'%';

  
}













///Galvanometer constants result show
function showResult1(){
	
var T     = document.getElementById('avgtimep').value;	
var Rcoil = document.getElementById('Rc').value;	
var Rext  = document.getElementById('Rs').value;	
var S     = document.getElementById('S').value;	

document.getElementById('g').value = math.divide(math.multiply(T,math.add(Rcoil,Rext)),math.multiply(math.pi,S)).toPrecision(4);

document.getElementById('c').value = math.divide(math.multiply(T,math.add(Rcoil,Rext)),math.multiply(math.pi,math.pow(S,2))).toPrecision(4);	

document.getElementById('j').value = math.divide(math.multiply(math.pow(T,3),math.add(Rcoil,Rext)),math.multiply(4,math.pow(math.pi,3),math.pow(S,2))).toPrecision(4);
	
}

///Transient response open circuit damping ratio
function showResult2(){
	
var T1     = document.getElementById('theta1').value;	
var T2 	   = document.getElementById('theta2').value;	

document.getElementById('dampR').value = math.divide(math.log(math.divide(T1,T2),math.e),math.pi);
	
}

///Transient response percentage overshoot
function showResult3(){
	
var tpeak  = document.getElementById('thetapeak').value;	
var tss	   = document.getElementById('thetass').value;	

document.getElementById('pov').value = math.multiply(math.divide(math.subtract(tpeak,tss),tss),100);
	
}

///Frequency response Wn
function showResult4(){
	
var T  = document.getElementById('tp4').value;	
var nf = math.divide(math.multiply(2,math.pi),T);	

document.getElementById('wn4').value = nf;
	
}

/////////////////////////////////////////////ALL FUNCTIONS FOR ROTATING KNOBS///////////////////////////////////
var angle1= 0,angle2= 0,angle3= 0,angle4= 0,angle5= 0,angle6= 0,angle7= 0,angle8= 0,angle9= 0,angle10= 0,angle11= 0,angle12= 0;

/////////////////////////////////////////////////////////P knob////////////////////////////////////////
function rotate1(){
	
	angle1++;
	var deg = angle1*20;
	//alert(deg);
	var knob1= document.getElementById('knob1');	
	knob1.style.transform="rotate("+deg+"deg)";
	
	document.getElementById('pnob').stepUp(1);
	document.getElementById('pValue').value = document.getElementById('pnob').value;
	if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob1.style.transform=null; 
	document.getElementById('pnob').value = 0;
	angle=0;
	return;
   }
    
 }
 function rotate2(){
	
	angle1--;
	var deg = angle1*20;
	//alert(deg);
	var knob1= document.getElementById('knob1');	
	knob1.style.transform="rotate("+deg+"deg)";
		
	document.getElementById('pnob').stepDown(1);	
	document.getElementById('pValue').value = document.getElementById('pnob').value;
	if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob1.style.transform=null; 
	
	angle1=0;
	return;
   }
 }
 ///////////////////////////////////////////////////////Q knobs//////////////////////////////////////////////////////   
 
 function rotate3(){
	
	angle2++;
	var deg = angle2*20;
	//alert(deg);
	var knob2= document.getElementById('knob2');	
	knob2.style.transform="rotate("+deg+"deg)";
	
	document.getElementById('qnob1').stepUp(1);   
	  
     var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob2.style.transform=null; 
	document.getElementById('qnob1').value = 0;
	angle2=0;
	return;
   }
    
 }
 function rotate4(){
	
	angle2--;
	var deg = angle2*20;
	//alert(deg);
	var knob2= document.getElementById('knob2');	
	knob2.style.transform="rotate("+deg+"deg)";
	
	document.getElementById('qnob1').stepDown(1);
   
     var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   
  if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob2.style.transform=null; 
	
	angle2=0;
	return;
   }
    
 }
 function rotate5(){
	
	angle3++;
	
	var deg = angle3*20;
	//alert(deg);
	var knob3= document.getElementById('knob3');	
	knob3.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('qnob2').stepUp(1);
   
    var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob3.style.transform=null; 
	document.getElementById('qnob2').value = 0;
	angle3=0;
	return;
   }
    
 }
 function rotate6(){
	
	angle3--;
	
	var deg = angle3*20;
	//alert(deg);
	var knob3= document.getElementById('knob3');	
	knob3.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('qnob2').stepDown(1);
   
    var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob3.style.transform=null; 
	
	angle3=0;
	return;
   }
    
 }

 function rotate7(){
	
	angle4++;
	
	var deg = angle4*20;
	//alert(deg);
	var knob4= document.getElementById('knob4');	
	knob4.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('qnob3').stepUp(1);
   
    var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob4.style.transform=null; 
	document.getElementById('qnob3').value = 0;
	angle4=0;
	return;
   }
    
 }
 function rotate8(){
	
	angle4--;
	
	var deg = angle4*20;
	//alert(deg);
	var knob4= document.getElementById('knob4');	
	knob4.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('qnob3').stepDown(1);
   
     var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob4.style.transform=null; 
	
	angle4=0;
	return;
   }
    
 }
 
 function rotate9(){
	
	angle5++;
	
	var deg = angle5*20;
	//alert(deg);
	var knob5= document.getElementById('knob5');	
	knob5.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('qnob4').stepUp(1);
   
   var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob5.style.transform=null; 
	document.getElementById('qnob4').value = 0;
	angle5=0;
	return;
   }
    
 }
 function rotate10(){
	
	angle5--;
	
	var deg = angle5*20;
	//alert(deg);
	var knob5= document.getElementById('knob5');	
	knob5.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('qnob4').stepDown(1);
   
   var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob4.style.transform=null; 
	
	angle5=0;
	return;
   }
    
 }
 function rotate11(){
	
	angle6++;
	
	var deg = angle6*20;
	//alert(deg);
	var knob6= document.getElementById('knob6');	
	knob6.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('qnob5').stepUp(1);
   
   var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob6.style.transform=null; 
	document.getElementById('qnob5').value = 0;
	angle6=0;
	return;
   }
    
 }
 function rotate12(){
	
	angle6--;
	
	var deg = angle6*20;
	//alert(deg);
	var knob6= document.getElementById('knob6');	
	knob6.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('qnob5').stepDown(1);
   
    var qv1 = math.multiply(document.getElementById('qnob1').value,10000);
   var qv2 = math.multiply(document.getElementById('qnob2').value,1000);
   var qv3 = math.multiply(document.getElementById('qnob3').value,100);
   var qv4 = math.multiply(document.getElementById('qnob4').value,10);
   var qv5 = math.multiply(document.getElementById('qnob5').value,1);   
   
   document.getElementById('qValue').value = math.add(qv1,qv2,qv3,qv4,qv5);
   if(document.getElementById('partchk').value == 1 || document.getElementById('partchk').value == 2 || document.getElementById('partchk').value == 3){
	movepoint(); 
	}
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob6.style.transform=null; 
	
	angle6=0;
	return;
   }
    
 }
 
 /////////////////////////////////////////////////R knobs////////////////////////////////////////////////////////////
 function rotate13(){
	
	angle7++;
	var deg = angle7*20;
	//alert(deg);
	var knob7= document.getElementById('knob7');	
	knob7.style.transform="rotate("+deg+"deg)";
	
	document.getElementById('rnob1').stepUp(1);   
	  
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
   
   if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob7.style.transform=null; 
	document.getElementById('rnob1').value = 0;
	angle7=0;
	return;
   }
    
 }
 function rotate14(){
	
	angle7--;
	var deg = angle7*20;
	//alert(deg);
	var knob7= document.getElementById('knob7');	
	knob7.style.transform="rotate("+deg+"deg)";
	
	document.getElementById('rnob1').stepDown(1);   
      
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob7.style.transform=null; 
	
	angle7=0;
	return;
   }
    
 }
 function rotate15(){
	
	angle8++;
	
	var deg = angle8*20;
	//alert(deg);
	var knob8= document.getElementById('knob8');	
	knob8.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob2').stepUp(1);   
      
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob8.style.transform=null; 
	document.getElementById('rnob2').value = 0;
	angle8=0;
	return;
   }
    
 }
 function rotate16(){
	
	angle8--;
	
	var deg = angle8*20;
	//alert(deg);
	var knob8= document.getElementById('knob8');	
	knob8.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob2').stepDown(1);   
     
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob8.style.transform=null; 
	
	angle8=0;
	return;
   }
    
 }

 function rotate17(){
	
	angle9++;
	
	var deg = angle9*20;
	//alert(deg);
	var knob9= document.getElementById('knob9');	
	knob9.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob3').stepUp(1);   
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
   
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob9.style.transform=null; 
	document.getElementById('qnob9').value = 0;
	angle9=0;
	return;
   }
    
 }
 function rotate18(){
	
	angle9--;
	
	var deg = angle9*20;
	//alert(deg);
	var knob9= document.getElementById('knob9');	
	knob9.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob3').stepDown(1);
   
      
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob9.style.transform=null; 
	
	angle9=0;
	return;
   }
    
 }
 
 function rotate19(){
	
	angle10++;
	
	var deg = angle10*20;
	//alert(deg);
	var knob10= document.getElementById('knob10');	
	knob10.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob4').stepUp(1);   
     
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob10.style.transform=null; 
	document.getElementById('rnob4').value = 0;
	angle10=0;
	return;
   }
    
 }
 function rotate20(){
	
	angle10--;
	
	var deg = angle10*20;
	//alert(deg);
	var knob10= document.getElementById('knob10');	
	knob10.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob4').stepDown(1);   
     
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob10.style.transform=null; 
	
	angle10=0;
	return;
   }
    
 }
 function rotate21(){
	
	angle11++;
	
	var deg = angle11*20;
	//alert(deg);
	var knob11= document.getElementById('knob11');	
	knob11.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob5').stepUp(1);   
     
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob11.style.transform=null; 
	document.getElementById('rnob5').value = 0;
	angle11=0;
	return;
   }
    
 }
 function rotate22(){
	
	angle11--;
	
	var deg = angle11*20;
	//alert(deg);
	var knob11= document.getElementById('knob11');	
	knob11.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob5').stepDown(1);   
     
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob11.style.transform=null; 
	
	angle11=0;
	return;
   }
    
 }
 function rotate23(){
	
	angle12++;
	
	var deg = angle12*20;
	//alert(deg);
	var knob12= document.getElementById('knob12');	
	knob12.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob6').stepUp(1);   
     
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
  
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if( deg>200){
	alert('This is the highest value, can not rotate knob') ;  
	knob12.style.transform=null; 
	document.getElementById('rnob6').value = 0;
	angle12=0;
	return;
   }
    
 }
 function rotate24(){
	
	angle12--;
	
	var deg = angle12*20;
	//alert(deg);
	var knob12= document.getElementById('knob12');	
	knob12.style.transform="rotate("+deg+"deg)";
	
   document.getElementById('rnob6').stepDown(1);   
     
   var rv1 = math.multiply(document.getElementById('rnob1').value,100);
   var rv2 = math.multiply(document.getElementById('rnob2').value,0.1);
   var rv3 = math.multiply(document.getElementById('rnob3').value,1000);
   var rv4 = math.multiply(document.getElementById('rnob4').value,1);
   var rv5 = math.multiply(document.getElementById('rnob5').value,10000);
   var rv6 = math.multiply(document.getElementById('rnob6').value,10);
   
   document.getElementById('rValue').value = math.add(rv1,rv2,rv3,rv4,rv5,rv6);
    if(document.getElementById('partchk').value == 1){
   movepoint();
   }
   if(document.getElementById('partchk').value == 2){
   criticalDamping();
   }
   if(document.getElementById('partchk').value == 3 ){
   transients_short();
   }
   
	if(document.getElementById('partchk').value == 4){
		frqRes();
	}
   
   if(deg<0 ){
	alert('This is the lowest value, can not rotate knob') ;  
	knob12.style.transform=null; 
	
	angle12=0;
	return;
   }
    
 }

///////////////////////////////////////////////////////////////////////////////Table Creation//////////////////////////////////////////////////////////////////////////////////////
 
 var tabrowindex1 = 0, tabrowindex2 = 0, tabrowindex3 = 0, tabrowindex4 = 0;
var arr1 = [],arr2 = [],arr3=[], arr4 =[];
var table1,table2,table3,table4;

//------------------------------------------------- Table Creation -----------------------------------------------//
function createTable1() {///time period

	document.getElementById("myTable1").style.visibility="visible";
	document.getElementById("myTable2").style.visibility="hidden";
	document.getElementById("myTable3").style.visibility="hidden";
	document.getElementById("myTable4").style.visibility="hidden";

    arr1[0] = tabrowindex1+1 ;
    arr1[1] = document.getElementById("Nos").value;
    arr1[2] = document.getElementById("time").value;
	arr1[3] = math.divide(arr1[2],arr1[1]);
	//document.getElementById('Tp').value = math.divide(math.add(document.getElementById('Tp').value,arr1[3]),arr1[0]);
   
	
	table1 = document.getElementById("myTable1");
        
    var row = table1.insertRow(++tabrowindex1);
   
    if (table1.rows.length <= 7) {
        
         // Row increment
        for (var q = 0; q < 4; q++) {

            var cell = row.insertCell(q);
            cell.innerHTML = arr1[q];
			
    }

    }

}    

function createTable2() {///sensitivity

	document.getElementById("myTable2").style.visibility="visible";
	document.getElementById("myTable1").style.visibility="hidden";
	document.getElementById("myTable3").style.visibility="hidden";
	document.getElementById("myTable4").style.visibility="hidden";

    arr2[0] = tabrowindex2+1 ;
    arr2[1] = document.getElementById("pValue").value;
	arr2[2] = dcm.toPrecision(2);
	arr2[3] = (dcm/(2*100)).toPrecision(2);//math.multiply(0.5,math.atan2(math.divide(dcm,100)));
    arr2[4] = Ig;
	
		
	table2 = document.getElementById("myTable2");
        
    var row = table2.insertRow(++tabrowindex2);
   
    if (table2.rows.length <= 10) {
        
         // Row increment
        for (var q = 0; q < 5; q++) {

            var cell = row.insertCell(q);
            cell.innerHTML = arr2[q];
			
    }

    }

}   

function createTable3() {///overshoot (transient response)

	document.getElementById("myTable3").style.visibility="visible";
	document.getElementById("myTable2").style.visibility="hidden";
	document.getElementById("myTable1").style.visibility="hidden";
	document.getElementById("myTable4").style.visibility="hidden";
	
    arr3[0] = tabrowindex3+1 ;
    arr3[1] = document.getElementById("rValue").value;
	arr3[2] = Math.floor(Number(document.getElementById("dampR2").value)*10)/10;
	arr3[3] = document.getElementById("thetapeak").value;
    arr3[4] = document.getElementById("thetass").value;
	arr3[5] = Math.floor(Number(document.getElementById("pov").value)*10)/10;
		
	table3 = document.getElementById("myTable3");
        
    var row = table3.insertRow(++tabrowindex3);
   
    if (table3.rows.length <= 10) {
        
         // Row increment
        for (var q = 0; q < 6; q++) {

            var cell = row.insertCell(q);
            cell.innerHTML = arr3[q];
			
    }

    }

}   

function createTable4() {///Oscillation Amplitude (frequency response)

	document.getElementById("myTable4").style.visibility="visible";
	document.getElementById("myTable2").style.visibility="hidden";
	document.getElementById("myTable1").style.visibility="hidden";
	document.getElementById("myTable3").style.visibility="hidden";
	
    arr4[0] = tabrowindex4+1 ;
    arr4[1] = document.getElementById("fq-knob-fng").value;
	arr4[2] = math.multiply(arr4[1] ,2 ,math.pi);
	arr4[3] = document.getElementById("dampR2").value;
    arr4[4] = Oscm;//(Math.floor(Oscm *10))/10;
	
		
	table4 = document.getElementById("myTable4");
        
    var row = table4.insertRow(++tabrowindex4);
   
    if (table4.rows.length <= 20) {
        
         // Row increment
        for (var q = 0; q < 5; q++) {

            var cell = row.insertCell(q);
            cell.innerHTML = arr4[q];
			
    }

    }

}   


function Refresh(){
	
	if(document.getElementById('myTable1').style.visibility == 'visible'){
	var Dtable= document.getElementById('myTable1');
	var Trow = Dtable.rows.length;
	for (var i= Trow-1;i>0;i--){

	Dtable.deleteRow(i);
	}
	document.getElementById('Nos').value =0;	 
	document.getElementById('time').value =0;
	}
	
	if(document.getElementById('myTable2').style.visibility == 'visible'){
	var Dtable= document.getElementById('myTable2');
	var Trow = Dtable.rows.length;
	for (var i= Trow-1;i>0;i--){

	Dtable.deleteRow(i);
	}
	}
	
	if(document.getElementById('myTable3').style.visibility == 'visible'){
	var Dtable= document.getElementById('myTable3');
	var Trow = Dtable.rows.length;
	for (var i= Trow-1;i>0;i--){

	Dtable.deleteRow(i);
	}
	}
	
	if(document.getElementById('myTable4').style.visibility == 'visible'){
	var Dtable= document.getElementById('myTable4');
	var Trow = Dtable.rows.length;
	for (var i= Trow-1;i>0;i--){

	Dtable.deleteRow(i);
	}
	}
	
	//Dtable.style.display="none";
	tabrowindex1=0;
	tabrowindex2=0;
	tabrowindex3=0;
	tabrowindex4=0;
	//dataPoints1=[];
	//dataPoints2=[];
	//dataOPPoints =[];
	arr1=[];
	arr2=[];
	arr3=[];
	arr4=[];
	document.getElementById('plotbucket').style.display="none"; 
	
	
 }


    
	
	
	
	function plot_sensitivity(){
		var dataPoints1=[];
		
	 document.getElementById('plotbucket').style.display  = "block";	 
	 document.getElementById('chartContainer').style.display  = "block";
	 document.getElementById('chartContainer_trans').style.display  = "none";
	 
    table2 = document.getElementById('myTable2');
    for (var tabrowindex = 1; tabrowindex < table2.rows.length; tabrowindex++) {
        var rwe = table2.rows[tabrowindex].cells;

       dataPoints1.push({x: parseFloat((rwe[3].innerHTML)), y: parseFloat((rwe[4].innerHTML)*1000000)});
    }
 
	
 
	var chart = new CanvasJS.Chart("chartContainer",
    {
      //animationEnabled: true,
		  //animationDuration: 10000, 
	  title:{
      text: "Ig Vs. Theta Plot "
	  
      },
	  
	  axisX:
	  
	  {
        interlacedColor: "#B2F9FA",
        title: "Theta(rad)"
      },
	  
	  
	  
	  
	  
    axisY: 
	      {// Y axis
            title: "Ig(uA)",
			
			//maximum:28,
        },
		
		
	data: [
      {        
        type: "line",
		color:"109DB6",
        dataPoints:dataPoints1
	
       },
       
      ]	
	});

	chart.render();
	
	document.getElementById('exportChart_trans').style.display  = "none";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
	}

function plot_overshoot(){
	
	var dataPoints2=[];
	 document.getElementById('plotbucket').style.display  = "block";	 
	 document.getElementById('chartContainer').style.display  = "block";
	 document.getElementById('chartContainer_trans').style.display  = "none";
 
    table3 = document.getElementById('myTable3');
    for (var tabrowindex = 1; tabrowindex < table3.rows.length; tabrowindex++) {
        var rwe = table3.rows[tabrowindex].cells;

        dataPoints2.push({x: (rwe[2].innerHTML)*10, y: (rwe[5].innerHTML)*10});
		//console.log('x='+rwe[2].innerHTML);
		//console.log('y='+rwe[5].innerHTML);
    }
 
	
 
	var chart = new CanvasJS.Chart("chartContainer",
    {
      //animationEnabled: true,
		  //animationDuration: 10000, 
	  title:{
      text: "%Overshoot Vs. delta(damping ratio) Plot (10x) "
	  
      },
	  
	  axisX:
	  
	  {
        interlacedColor: "#B2F9FA",
        title: "Damping ratio"
      },
	  
	  
	  
	  
	  
    axisY: 
	      {// Y axis
            title: "%Overshoot",
			
			//maximum:28,
        },
		
		
	data: [
      {        
        type: "spline",
		color:"black",
        dataPoints:dataPoints2
	
       },
       
      ]	
	});

	chart.render();
	
	document.getElementById('exportChart_trans').style.display  = "none";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
	}


	function plot_frq(){
	
	var dataPoints3 =[];
	 document.getElementById('plotbucket').style.display  = "block";	 
	 document.getElementById('chartContainer').style.display  = "block";
	 document.getElementById('chartContainer_trans').style.display  = "none";
 
    table4 = document.getElementById('myTable4');
    for (var tabrowindex = 1; tabrowindex < table4.rows.length; tabrowindex++) {
        var rwe = table4.rows[tabrowindex].cells;

        dataPoints3.push({x: (rwe[1].innerHTML), y: ((rwe[4].innerHTML)*10) });
    }
 
	
 
	var chart = new CanvasJS.Chart("chartContainer",
    {
      //animationEnabled: true,
		  //animationDuration: 10000, 
	  title:{
      text: "Amplitude Vs. Frequency Plot "
	  
      },
	  
	  axisX:
	  
	  {
        interlacedColor: "#B2F9FA",
        title: "Frequency (Hz)",
		logarithmic: true
      },
	  
	  
	  
	  
	  
    axisY: 
	      {// Y axis
            title: "Amplitude (mm)",
			
			//maximum:28,
        },
		
		
	data: [
      {        
        type: "spline",
		color:"black",
        dataPoints:dataPoints3
	
       },
       
      ]	
	});

	chart.render();
	
	document.getElementById('exportChart_trans').style.display  = "none";
	document.getElementById("exportChart").style.display = "block";
	document.getElementById("exportChart").addEventListener("click",function(){
	chart.exportChart({format: "jpg"})});	
	}







 
 
 