### Procedure
The experiment is having two different types of circuit connections<br/>


<div align="center">
<img class="img-fluid"  src="./images/sp.png" alt="">
</div>								            


**Steps to perform the simulation**

<b>Finding galvanometer constants :</b>

1. First connect the circuit diagram properly through the connecting dots (black dots) according to below instruction. First the galvanometer would be connected in series with the resistance box R (Fig. 1.).

9-7, 7-17, 18-13, 14-22, 23-16, 19-20, 21-12, 15-17, 8-11, 6-16.

2. Click on 'Check Connection' button to check whether the connection is proper or not. Click on the key of 'K<sub>3</sub>' to open it. Then click on the mcb and switch on the light by clicking on the red switch. The 
reflection from galvanometer (yellow spot) will be seen on the scale.

3. P, Q, R are the resistance boxes. Keeping R to zero value adjust the values of P (0.2 &ohm;) and Q (1670&ohm;) by respective rotating knobs to achieve 20 cm deflection on scale.

(<b>Note:</b> The numbers, written near the knobs (in &ohm; or k&ohm;), shows the multiplying factors of respective knobs.)

Now open the switch K<sub>2</sub> by removing the connection 13-18 through clicking on it. After clicking on the connection 13-18, one alert message will come. Keep ready the stop watch in mobile. Click on the confirmation alert message and start the stop watch together. Observe the oscillation of the light spot on the scale. Count number of oscillations and stop the watch when the oscillation stops.

4. Enter the number of oscillations observed and time of the stop watch in the right hand side box under the scale. Click on 'Show Table' button , then on 'Time period'. The observation table will be shown at the bottom of the page. Switch off the light ,click on the switch 'K<sub>3</sub>' to open it and again connect 13-18. Switch on the light. Disconnect the connection 13-18 for another two times and take observation of time period following step 3. After taking three successive observations, calculate the average time period (<span class="fontCss3">T</span>) of the galvanometer. Write it in the input box under the table 
as well as in the corresponding box under the scale. Switch off the light.

5. After calculation of average time period, connect 13-18 again and click on the switch 'K<sub>3</sub>' to open it. Switch on the light. Deflection should be 20 cm now on scale. To determine coil resistance <span class="fontCss3">R<sub>c</sub></span> (&ohm;) of the galvanometer, slowly increase the value of R (70 &ohm;) to get 10 cm deflection on scale. This value or R is called <span class="fontCss3">R<sub>c</sub></span>. Switch off the light. Bring all the resistance values to zero.

6. Now the galvanometer would be connected in parallel with the resistance box R (Fig. 2.). To make the parallel connection, delete connection 14-22 and connect 14-16, 17-22. 
Click on 'Check Connection' button to check whether the connection is proper or not. Click on the switch 'K<sub>3</sub>' to open it and switch on the light. To determine external resistance <span class="fontCss3">R<sub>s</sub></span> (&ohm;) for critical damping of the galvanometer, adjust the values of P (0.2 &ohm;) and Q (1670 &ohm;) by respective rotating knobs to achieve 20 cm deflection on scale. Now adjust R to obtain oscillatory motion, then decrease R (&approx; 90 &ohm;) until the motion just ceases to be oscillatory. This value of R is <span class="fontCss3">R<sub>s</sub></span>. Write it in the corresponding box under the scale. Switch off the light.

7. Now make the series connection again, as said in step 1. To determine sensitivity <span class="fontCss3">S</span> (rad/ampere) of the galvanometer, keep the value of R (<span class="fontCss3">R<sub>s</sub></span> &plus; <span class="fontCss3">R<sub>c</sub></span>) to a  convenient value say 100 &ohm;. Set P to 0.1 &ohm; , open K<sub>3</sub> and switch on the light. Click on 'Show Table' button and then on 'Sensitivity'. The observation table will be shown at the bottom of the page. Increase the value of P to 0.2, 0.3, 0.4 and 0.5.
Each time after increasing the value click on 'Show Table' button and then on 'Sensitivity' to take the observation.

8. At the end of 5 observations click on 'Plot', then on 'Galvanometer current (<span class="fontCss3">I<sub>g</sub></span>) Vs. Deflection (<span class="fontCss3">&theta;</span>)'. The plot 'Galvanometer current (<span class="fontCss3">I<sub>g</sub></span>) Vs. Deflection (<span class="fontCss3">&theta;</span>)' 
will be shown with <span class="fontCss3">I<sub>g</sub></span> in (uA) and <span class="fontCss3">&theta;</span> in radian (hover over the plot section and then click on the camera icon located at the top right corner of the plot to download it). From the slope of the plot find the value of sensitivity <span class="fontCss3">S</span> (rad/A) as shown in Fig. 3. The formula is as follows :

$$Sensitivity \ (rad/A) = \frac{difference \ in \ deflection \ (say \ \Delta\theta)}{ \ difference \ in \ galvanometer \ current \  \Delta I_g \times 10^{-6} }$$

Write it in the corresponding box under the scale.
	 

<div align="center">
<img class="img-fluid"  src="./images/splot.png" alt=""><br/>
<b>Fig. 3. Calculation of Sensitivity</b>
</div><br/><br/>

9. Click on 'Calculate' button at the bottom of the left hand side box under the scale.
The results will be shown in respective input boxes in the right hand side box under the scale. Note down the values of galvanometer displacement constant (<span class="fontCss3">G</span>),
restoring constant (<span class="fontCss3">K</span>), moment of inertia (<span class="fontCss3">J</span>). Click on 'Clear' button. Switch off the light. Bring all the resistances to zero value.
These constants are calculated using the equations below.

$$G = \frac{T(R_c + R_s)}{\pi S} \ nw-m/A/A$$
$$K = \frac{T(R_c + R_s)}{\pi S^2} \ nw-m/rad$$
$$J = \frac{T^3(R_c + R_s)}{4 \pi^3 S^2} \ kg-m^2$$



<b>Transient Response :</b>

1. First connect the circuit diagram as said in step 1 of 'Finding galvanometer constants' section. Click on 'Experiments' button, then 'Transient Response' under it.

2. Click on the switch 'K<sub>3</sub>' to open it. Then switch on the light by clicking on the red switch. The 
reflection from galvanometer (yellow spot) will be seen on the scale.

3. Adjust the values of P (0.2 &ohm;) and Q (1670&ohm;) by respective rotating knobs to achieve 20 cm deflection on scale.

4. Now open the switch K<sub>2</sub> by removing the connection 13-18 through clicking on it. The under damped response for sudden disconnecting switch K<sub>2</sub> will be shown at the bottom of the page (Fig. 4) (click on 'Download Plot' button to download this plot). Calculate <span class="fontCss3">&theta;<sub>1</sub></span> and <span class="fontCss3">&theta;<sub>2</sub></span> from the response using the formula below.

$$\theta_1 = (First \ overshoot - \ Steady \ state \ value) \ and \ \theta_2 = (Steady \ state \ value - \ First \ undershoot)$$


<div align="center">
<img src="./images/ov.png" class="img-fluid"/><br/>
<b>Fig. 4. Calculation of <span class="fontCss3">&theta;<sub>1</sub></span> and <span class="fontCss3">&theta;<sub>2</sub></span></b>
</div>


5. Now put those values in the right hand side box under the scale. Click on 'Calculate' button to calculate the value of open circuit damping ratio (<span class="fontCss3">&delta;<sub>0</sub></span>).

6. Switch off the light, connect 13-18 again and open K<sub>3</sub>. Switch on the light. Set R to 200 &ohm;. The underdamped response for this value of R will be shown at the bottom of the page (click on 'Download Plot' button to download this plot). The response is having small intervals along Y-axis so that the peak value or <span class="fontCss3">&theta;<sub>peak</sub></span> can be measured properly.

7. Enter the values of <span class="fontCss3">&theta;<sub>peak</sub>, &theta;<sub>steady-state</sub></span> (steady-state value of the response) in the left hand side input box under the scale. Click on 'Calculate' button to calculate the &percnt; overshoot. 

8. Click on 'Show Table' button, then on '&percnt; Overshoot'. The observation table will be shown at the bottom of the page. Increase the value of R to 300, 400, 500. Each time after increasing the value of R follow step 7 and click on 'Show Table' button, then on '&percnt; Maximum overshoot' to take the observation. 

9. After taking 5 observations click on 'Plot' button, then on '&percnt; Maximum overshoot Vs. Damping ratio <span class="fontCss3">&delta;</span>'. The plot will be shown (hover over the plot section and then click on the camera icon located at the top right corner of the plot to download it). Click on 'Clear' button. Switch off the light.


<b>Frequency Response :</b>

1. Once the transient response of the galvanometer is acquired, it is possible to observe its frequency response. First connect the circuit diagram as instructed below.

1-7, 7-17, 18-13, 14-22, 23-16, 19-20, 21-12, 15-17, 2-11, 6-16

Click on 'Check Connection' button to check whether the connection is proper or not. Click on 'Experiments' button, then on 'Frequency Response' under it.

2. Click on the switch 'K<sub>3</sub>' to open it. Enter the value of average time period of the galvanometer, calculated in 'Finding galvanometer constants' section in the input box at the bottom of the page. Click on 'Calculate' button to calculate the natural frequency of galvanometer (&omega;<sub>n</sub>).

3. Switch on the light. The light spot will be oscillating since the supply is 2 V ac now. Frequency is now 0.1 Hz.

4. Click on 'Show Table' button, then on 'Oscillation Amplitude'. The observation table will be shown at the bottom of the page. 

5. Now increase the frequency of input signal through the frequency knob of function generator to 0.2 Hz, click on 'Sine' button and repeat step 4. Now increase frequency by step of 0.1 Hz upto 10 Hz.
Each time after increasing the value click on 'Sine' button and repeat step 4.

6. After taking observations click on 'Plot' button, then on 'Amplitude (cm) Vs. Frequency (Hz)'. The frequency response plot will be shown for a particular damping ratio (<span class="fontCss3">&delta;</span>).

7. Click on 'Clear' button. Switch off the light. Change the value of <span class="fontCss3">&delta;</span> (say 0.6, 0.5, 0.4) by changing the value of R (say 300, 400, 500 &ohm;) and follow steps 4-6 again to 
observe the frequency response for a different damping ratio (<span class="fontCss3">&delta;</span>).


  
<link href="./simulation/css/galvano.css" rel="stylesheet">

  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>