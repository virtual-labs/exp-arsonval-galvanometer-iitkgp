# Theory

<b>Galvanometer</b><br/>

The use of D'Arsonval galvanometer is very common in variety of measuring instruments. The galvanometer is basically used in an instrument for detecting the presence of small
currents in a circuit or to indicate zero current in applications like bridge circuits. Thus galvanometer has to be very much sensitive.<br/><br/>

<b>Construction</b><br/>
The construction of  D'Arsonval galvanometer is shown in the Fig. 1.
<br/><br>

<div align="center">
<img class="img-fluid"  src="./images/pcon.png" alt=""><br/>
<b>Fig. 1. Construction of  D'Arsonval Galvanometer</b>  
</div><br>

It consists of the following parts,<br/>

<b>1. Moving coil</b><br/>

It is the current carrying element. It is either rectangular or circular in shape and consists of a number of turns of fine wire. This coil is suspended so that it is free to turn about its vertical axis of
symmetry. It is arranged in a uniform, radial, horizontal magnetic field of a permanent magnet and iron core. The iron core is spherical in shape if the coil is circular but is
cylindrical if the coil is rectangular. The iron core is used to provide a flux path of low reluctance and therefore to produce strong magnetic field. This increases the deflecting torque and hence the sensitivity of the galvanometer. The length of air gap is about 1.5 mm.

<br/><br/>

<b>2. Damping</b><br/>
There is a damping torque present owing to production of eddy currents in the metal former on which the coil is mounted.
For effective damping a low resistance is connected across the galvanometer terminals. By adjusting the value of this resistance, damping can be changed and
critical damping can be achieved.<br/><br/>

<b>3. Suspension</b><br/>
The coil is supported by a flat ribbon suspension which also carries current to the coil. The other current connection in a sensitive galvanometer is a coiled wire. This is called the lower
suspension which has a negligible torque effect. This type of galvanometer must be levelled carefully so that the coil hangs straight and centrally without rubbing the poles or the soft iron cylinder. 
In galvanometers which do not require the perfect leveling, taut suspensions with straight flat strips are used, which are kept under tension from both top and the bottom sides. The upper suspension 
consists of gold or copper wire of nearly 0.0125 or 0.025 mm diameter rolled into the form of a ribbon.<br/><br/>

<b>4. Indication</b><br/>
The suspension carries a small mirror upon which a beam of light is cast through a glass window in the outer brass case surrounding the instrument.
The beam of light is reflected on the scale upon which the deflection is measured.  The scale is calibrated in mm and usually kept 1 m (1000 mm) away from the mirror as shown in Fig. 2.<br/><br/>

<b>5. Zero setting</b><br/>
A torsion head is provided for the adjustment of the coil position and zero setting.<br/><br/>				

<div align="center">
<img class="img-fluid"  src="./images/plant_deflect2.png" alt=""><br>
<b>Fig. 2.  Measurement of deflection with lamp and scale arrangement </b>          
</div><br>	

<b>Torque Equation</b><br/>

Fig. 1 shows the parameters involved in the torque equation of a galvanometer.<br/>

Let,<br/>
<span class="fontCss2">l, r</span> = Length of respectively vertical and horizontal side (width) of coil, m,<br/>
<span class="fontCss3">N</span> = Number of turns in the coil,<br/>
<span class="fontCss3">B</span> = Flux density in the air gap, Wb/m<sup>2</sup>,<br/>
<span class="fontCss2">i</span> = Current through moving coil, A,<br/>
<span class="fontCss3">K</span> = Spring constant of suspension, Nm/rad,<br/>
<span class="fontCss3">K</span> is known by various names like control constant, restoring constant and stiffness constant.<br/>

<span class="fontCss3">&theta;<sub>F</sub></span> = Final steady state deflection of moving coil, rad.<br/>

Force on each side of coil is <span class="fontCss3">N. B</span><span class="fontCss2">il sin &alpha;</span><br/>

where <span class="fontCss2">&alpha;</span> = Angle between direction of magnetic field and the conductor.<br/>

The field is radial and, therefore, <span class="fontCss2">&alpha;</span> is 90&deg;<br/>
Hence, force on each side of coil (<span class="fontCss3">F</span><sub><span class="fontCss2">c</span></sub>)<br/>

$$F_c = NBil \tag{1}$$

Deflecting torque <span class="fontCss3">T<sub>d</sub></span> = force &times; distance<br/> 

$$= NBilr \tag{2}$$
$$= NBAi \tag{3}$$
where <span class="fontCss3">A</span> = <span class="fontCss2">lr</span> = area of coil, m<sup>2</sup><br/>
<span class="fontCss3">N, B, A</span> are constants for a galvanometer.

Hence deflecting torque (<span class="fontCss3">T<sub>d</sub></span>)

$$T_d = G i \tag{4}$$

where 
$$G = NBA = NBlr \tag{5}$$

<span class="fontCss3">G</span> is called the displacement constant of the galvanometer.<br/>

Controlling torque exerted by the suspension at deflection <span class="fontCss3">&theta;<sub>F</sub></span>, is<br/>

$$T_c = K \theta_F \tag{6}$$

For final steady deflection,

$$T_c = T_d$$

or

$$K \theta_F = G i$$

Hence, final steady deflection

$$\theta_F = \frac{G i}{K} \tag{7}$$

If the deflection is measured on a mm scale kept 1 metre away and if <span class="fontCss3">&theta;<sub>F</sub></span> is small, the deflection <span class="fontCss2">d</span> (mm) (Fig. 2) is given by :<br/>

<span class="fontCss2">d</span> = Radius &times; Angle turned by the reflected beam<br/>
Hence,

$$d = 1000 \times 2 \theta_F = 2000 \ \frac{Gi}{K} \tag{8}$$

This is because if the deflection is <span class="fontCss3">&theta;<sub>F</sub></span>, the mirror turns through an angle <span class="fontCss3">&theta;<sub>F</sub></span> while the reflected beam turns through an angle 2<span class="fontCss3">&theta;<sub>F</sub></span>.<br/><br/>




<b>Instrinsic constants of galvanometer</b><br/>
Various instrinsic constants of galvanometer are,<br/><br/>

<b>1. Displacement constant (<span class="fontCss3">G</span>) :</b> The deflecting torque is given by 

$$T_d = G i \ (see \ Eqn. \ 4)$$

where <span class="fontCss3">G</span> is the displacement constant of the galvanometer and is equal to <span class="fontCss3">NB</span><span class="fontCss2">lr</span>. The unit of <span class="fontCss3">G</span> is Nm/A.<br/>

<b>2. Constant of inertia (<span class="fontCss3">J</span>) :</b> A retarding torque is produced owing to inertia of moving system. This torque is dependent upon the moment of inertia of moving system and the angular acceleration.

$$T_i = J \frac{d^2\theta}{d t^2} \tag{9}$$
where, <span class="fontCss3">J</span> = Moment of inertia of moving system about the axis of rotation, kg-m^2<br/>

<!-- $$\frac{d^2\theta}{d t^2} = Angular \ acceleration$$ -->
<span class="fontCss2">&theta;</span> = Deflection at any time <span class="fontCss2">t</span><br/>

<span class="fontCss3">J</span> is also called the inertia constant.<br/><br/>

<b>3. Damping constant (<span class="fontCss3">D</span>) :</b>. Damping is provided by the friction due to motion of the coil in air and also by induced electrical effects if a closed circuit is provided. 
Damping torque is assumed to be proportional to velocity of the moving system. This is true for electro-magnetic damping and is at least a fair approximation for air damping.

$$T_D = D \frac{d\theta}{d t} \tag{10}$$

where, <span class="fontCss3">T<sub>D</sub></span> is damping torque, <span class="fontCss3">D</span> is damping constant in Newton-meter/rad s<sup>-1</sup><br/><br/>


<b>4. Control constant (<span class="fontCss3">K</span>) :</b> A controlling torque is produced due to elasticity of the system which tries to restore the moving system back to its original position.

$$T_c = K \theta \tag{11}$$

where, <span class="fontCss2">T<sub>c</sub></span> is controlling torque, <span class="fontCss3">K</span> = control constant or restoring constant in Newton-meter/rad<br/><br/>

<b>Dynamic Behaviour of Galvanometer</b><br/>

<div align="center">
<img class="img-fluid"  src="./images/torks.png" alt=""><br> 
<b>Fig. 3. Torque acts in galvanometer motion</b>
</div><br>

<b>Equation of Motion</b><br/>
There are four torques acting on the moving system. Deflecting torque, <span class="fontCss3">T<sub>d</sub></span>, tries to accelerate the system while inertia torque, <span class="fontCss3">T<sub>i</sub></span> 
damping torque, <span class="fontCss3">T<sub>D</sub></span> and the control torque, <span class="fontCss3">T<sub>c</sub></span>, try to retard the system.<br/>

Therefore, for any deflection <span class="fontCss3">&theta;</span> at any instant <span class="fontCss2">t</span>


$$T_i + T_D + T_c = T_d$$		   

$$J \frac{d^2 \theta}{dt^2} + D \frac{d\theta}{dt} + K\theta = Gi \tag{12}$$


<br/><br/>The solution of equation 12 has two parts,<br/>

1) Complementary function<br/>
2) Particular integral.<br/>

The complementary function (C.F.) represents the transient behaviour while particular integral (P.I.) represents the steady state condition i.e. final deflection of the moving system.
The behaviour of system before it achieves the steady state is transient behaviour. When transient behaviour dissipates, the system settles into its ultimate steady state position.
<br/><br/>

<b>Complementary function</b><br/>

The auxiliary equation of the differential equation (Eqn. 12) is obtained as,

$$J m^2 + D m + K = 0 \tag{13}$$

The roots of the equation 13 are,

$$m_1 = \frac{-D+\sqrt{D^2 - 4JK}}{2J} , m_2 = \frac{-D-\sqrt{D^2 - 4JK}}{2J}$$

Hence the solution has two exponential terms of power <span class="fontCss3">m<sub>1</sub></span>  and <span class="fontCss3">m<sub>2</sub></span> <br/>	

$$\theta = A e^{m_1 t} + B e^{m_2 t} \tag{14}$$

where <span class="fontCss3">A,B</span> are constants.<br/><br/>

<b>Particular integral</b><br/>

A steady current <span class="fontCss2">i</span> is passed through the galvanometer.<br/>
Under steady state conditions,

$$\frac{d \theta}{dt}=0 , \frac{d^2 \theta}{dt^2}=0, \theta = \theta_F$$

Putting the above conditions in Eqn. 12, the final steady state deflection is

$$\theta_F = \frac{G i}{K} \tag{15}$$

Thus, the complete solution of differential equation is

$$\theta = A e^{m_1 t} + B e^{m_2 t} + \theta_F \tag{16}$$


Now the transient terms may be purely exponential or oscillatory which depends on the nature of roots <span class="fontCss3">m<sub>1</sub></span>  and <span class="fontCss3">m<sub>2</sub></span>. This defines the various damping conditions of the system.<br/>	
<br/><br/>

<b>Underdamped motion (<span class="fontCss3">D<sup>2</sup> &lt; 4JK</span>)</b><br/>

Both <span class="fontCss3">m<sub>1</sub></span>  and <span class="fontCss3">m<sub>2</sub></span> are complex conjugates of each other having negative real part.<br/>
Thus under these conditions the motion is oscillatory. The galvanometer oscillates about its final steady position with decreasing amplitude before finally settling at its final steady position. The 
galvanometer is underdamped in this case.

$$m_1,m_2 = -\frac{D}{2J} \pm j\frac{\sqrt{4JK - D^2}}{2J} = -\alpha \pm j\omega_d$$

$$D^2 - 4JK \lt 0 $$

In this case solution will be,

$$\theta = \theta_F \ [ 1 - \frac{2\sqrt{J K}}{\sqrt{4JK - D^2}}  e^{\frac{-D}{2J}t}  sin( \omega_d t + tan^{-1} \frac{\sqrt{4JK - D^2}}{D} ) ] \tag{17}$$

where,

$$\omega_d = \frac{\sqrt{4JK - D^2}}{2J}$$

When a current is suddenly passed through the coil of an underdamped galvanometer, the moving system will start from its zero current position and then oscillate about its final steady state position 
<span class="fontCss3">&theta;<sub>F</sub></span>. This oscillation would be an attenuated sinusoidal motion. The angular frequency of the sinusoidal component of this motion is 
<span class="fontCss3">&omega;<sub>d</sub></span>. The frequency of this sinusoidal component (called frequency of damped oscillations) is

$$f_d = \frac{\omega_d}{2 \pi} \tag{18}$$

and the time period is :

$$T_d = \frac{1}{f_d} = \frac{2 \pi}{\omega_d} \tag{19}$$

<br/>
<b>Undamped motion</b><br/>
The undamped motion of a galvanometer is obtained when there are no damping forces i.e., when <span class="fontCss3">D</span> = 0. Such a case is not possible under practical working conditions, but the properties of the 
undamped galvanometer are used in expressing its motion under actual operating conditions. <br/>

For undamped motion the Angular frequency (<span class="fontCss3">&omega;<sub>n</sub></span> (rad/s)), 
$$\omega_n = \sqrt{\frac{K}{J}} \tag{20}$$
putting <span class="fontCss3">D</span> = 0 in 

$$\frac{\sqrt{4JK - D^2}}{2 J}$$

The frequency of undamped (called natural or free oscillation) is :
$$f_n = \frac{\omega_n}{2 \pi} = \frac{1}{2 \pi} \sqrt{\frac{K}{J}} \tag{21}$$

and the free period of oscillations is<br/>

$$T_0 = \frac{1}{f_n} = 2 \pi \sqrt{\frac{J}{K}} \tag{22}$$

In this case the solution is 

$$\theta = \theta_F \ (1 - cos \omega_n t) \tag{23}$$

Thus the motion of the undamped galvanometer is an oscillation around <span class="fontCss3">&theta;<sub>F</sub></span> with a constant amplitude <span class="fontCss3">&theta;<sub>F</sub></span> and a frequency <span class="fontCss2">f<sub>n</sub></span>.

<br/><br/>

<b>Critically damped motion (<span class="fontCss3">D<sup>2</sup> = 4JK</span>)</b><br/>

For critical damping, the roots <span class="fontCss3">m<sub>1</sub></span> and <span class="fontCss3">m<sub>2</sub></span> are equal, real and negative.<br/>
In this case the transient response is not oscillatory but purely exponential such that the pointer attains the steady state position very quickly.


$$m_1 = m_2 = \frac{-D}{2J}$$

$$D^2 - 4JK = 0 , D = 2\sqrt{JK}$$

In this case solution is,<br/>

$$\theta = \theta_F \ [ 1 - e^{-\frac{D}{2J}}t ( 1 + \frac{D}{2J}t )] \tag{24}$$

Now for critical damping<br/>

$$D = D_c = 2\sqrt{KJ}$$ 

where <span class="fontCss3">D<sub>c</sub></span> = damping constant for critical damping.<br/>

Under critical damping conditions 

$$\frac{D}{2J} = \frac{2 \sqrt{K J}}{2 J} = \sqrt{\frac{K}{J}} = \omega_n$$ 

<b>Over damped motion (<span class="fontCss3">D<sup>2</sup> &gt; 4JK</span>)</b><br/>

When the damping is more than the damping for critical case, the motion is called over damped and the roots <span class="fontCss3">m<sub>1</sub></span> and <span class="fontCss3">m<sub>2</sub></span> are real, unequal and negative.
For overdamped case the transient response is exponential and non oscillatory. The pointer attains final steady state position 
<span class="fontCss3">&theta;<sub>F</sub></span> exponentially, taking more time than that of critical damping.			


In this case solution is,<br/>

$$\theta = \theta_F \ [ 1 + \frac{\zeta + \sqrt{\zeta^2 -1}}{2 \sqrt{\zeta^2 -1}}e^{-\omega_n t (\zeta - \sqrt{\zeta^2 -1})} - \frac{\zeta - \sqrt{\zeta^2 -1}}{2 \sqrt{\zeta^2 -1}}e^{-\omega_n t (\zeta + \sqrt{\zeta^2 -1})} ] \tag{25}$$
where natural frequency = <span class="fontCss3">&omega;<sub>n</sub></span>
$$\omega_n = \sqrt{\frac{K}{J}}$$

The above expression (Eqn. 23) represents a decaying motion without oscillations or overshoot. However, this motion is usually slow and is not desirable in indicating instruments. 
The value of <span class="fontCss3">&zeta; = D/ D<sub>c</sub></span>.<br/>
where, <span class="fontCss3">D<sub>c</sub></span> = damping constant for critical damping.

			    
<link href="./simulation/css/galvano.css" rel="stylesheet">

<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>								
