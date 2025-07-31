import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Pages/header-sidebar/Header';
import Sidebar from '../Pages/header-sidebar/Sidebar';
import {
  FiDollarSign, FiUser, FiEye, FiTrendingUp,
  FiUpload,
  FiCheckCircle,
  FiMusic,
  FiUploadCloud,
  FiYoutube,
  FiShare2,
  FiBell,
  FiAlertCircle,
  FiTrash2,
  FiClock
} from 'react-icons/fi';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import SidebarDemo from '../Pages/header-sidebar/Sidebar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  const globeWrapperRef = useRef(null);
  const canvas3DRef = useRef(null);
  const canvas2DRef = useRef(null);
  const popupRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => prev - 1);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // Changed to 1024 to cover both sm and md
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initialize the globe
    const containerEl = globeWrapperRef.current;
    const canvas3D = canvas3DRef.current;
    const canvas2D = canvas2DRef.current;
    const popupEl = popupRef.current;

    let renderer, scene, camera, rayCaster, controls, group;
    let overlayCtx = canvas2D.getContext("2d");
    let coordinates2D = [0, 0];
    let pointerPos;
    let clock, mouse, pointer, globe, globeMesh;
    let popupVisible;
    let earthTexture, mapMaterial;
    let popupOpenTl, popupCloseTl;
    let dragged = false;

    // Scene initialization
    renderer = new THREE.WebGLRenderer({
      canvas: canvas3D,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1.1, 1.1, 1.1, -1.1, 0, 3);
    camera.position.z = 1.1;

    rayCaster = new THREE.Raycaster();
    rayCaster.far = 1.15;
    mouse = new THREE.Vector2(-1, -1);
    clock = new THREE.Clock();

    // Orbit controls
    controls = new OrbitControls(camera, canvas3D);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 3;

    let timestamp;
    controls.addEventListener("start", () => {
      timestamp = Date.now();
    });
    controls.addEventListener("end", () => {
      dragged = (Date.now() - timestamp) > 600;
    });

    // Load earth texture and create globe
    new THREE.TextureLoader().load(
      "https://ksenia-k.com/img/earth-map-colored.png",
      (mapTex) => {
        earthTexture = mapTex;
        earthTexture.repeat.set(1, 1);

        // Create globe
        const globeGeometry = new THREE.IcosahedronGeometry(1, 22);
        mapMaterial = new THREE.ShaderMaterial({
          vertexShader: `
            uniform sampler2D u_map_tex;
            uniform float u_dot_size;
            uniform float u_time_since_click;
            uniform vec3 u_pointer;

            #define PI 3.14159265359

            varying float vOpacity;
            varying vec2 vUv;

            void main() {
              vUv = uv;
              float visibility = step(.2, texture2D(u_map_tex, uv).r);
              gl_PointSize = visibility * u_dot_size;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              vOpacity = (1. / length(mvPosition.xyz) - .7);
              vOpacity = clamp(vOpacity, .03, 1.);
              float t = u_time_since_click - .1;
              t = max(0., t);
              float max_amp = .15;
              float dist = 1. - .5 * length(position - u_pointer);
              float damping = 1. / (1. + 20. * t);
              float delta = max_amp * damping * sin(5. * t * (1. + 2. * dist) - PI);
              delta *= 1. - smoothstep(.8, 1., dist);
              vec3 pos = position;
              pos *= (1. + delta);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
            }
          `,
          fragmentShader: `
            uniform sampler2D u_map_tex;
            varying float vOpacity;
            varying vec2 vUv;

            void main() {
              vec3 color = texture2D(u_map_tex, vUv).rgb;
              color -= .2 * length(gl_PointCoord.xy - vec2(.5));
              float dot = 1. - smoothstep(.38, .4, length(gl_PointCoord.xy - vec2(.5)));
              if (dot < 0.5) discard;
              gl_FragColor = vec4(color, dot * vOpacity);
            }
          `,
          uniforms: {
            u_map_tex: { type: "t", value: earthTexture },
            u_dot_size: { type: "f", value: 0 },
            u_pointer: { type: "v3", value: new THREE.Vector3(0.0, 0.0, 1.0) },
            u_time_since_click: { value: 0 },
          },
          alphaTest: false,
          transparent: true
        });

        globe = new THREE.Points(globeGeometry, mapMaterial);
        scene.add(globe);

        globeMesh = new THREE.Mesh(globeGeometry, new THREE.MeshBasicMaterial({
          color: 0x222222,
          transparent: true,
          opacity: 0.05
        }));
        scene.add(globeMesh);

        // Create pointer (only for desktop)
        if (!isMobile) {
          const geometry = new THREE.SphereGeometry(0.04, 16, 16);
          const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0
          });
          pointer = new THREE.Mesh(geometry, material);
          scene.add(pointer);
        }

        // Create popup timelines (only for desktop)
        if (!isMobile) {
          popupOpenTl = gsap.timeline({ paused: true })
            .to(pointer.material, { duration: 0.2, opacity: 1 }, 0)
            .fromTo(canvas2D, { opacity: 0 }, { duration: 0.3, opacity: 1 }, 0.15)
            .fromTo(popupEl, {
              opacity: 0,
              scale: 0.9,
              transformOrigin: "center bottom"
            }, {
              duration: 0.1,
              opacity: 1,
              scale: 1
            }, 0.25);

          popupCloseTl = gsap.timeline({ paused: true })
            .to(pointer.material, { duration: 0.3, opacity: 0.2 }, 0)
            .to(canvas2D, { duration: 0.3, opacity: 0 }, 0)
            .to(popupEl, {
              duration: 0.3,
              opacity: 0,
              scale: 0.9,
              transformOrigin: "center bottom"
            }, 0);
        }

        // Add event listeners (only for desktop)
        if (!isMobile) {
          containerEl.addEventListener("mousemove", (e) => {
            updateMousePosition(e.clientX, e.clientY);
          });

          containerEl.addEventListener("click", (e) => {
            if (!dragged) {
              updateMousePosition(e.clientX, e.clientY);
              const res = checkIntersects();
              if (res.length) {
                pointerPos = res[0].face.normal.clone();
                pointer.position.set(res[0].face.normal.x, res[0].face.normal.y, res[0].face.normal.z);
                mapMaterial.uniforms.u_pointer.value = res[0].face.normal;
                popupEl.innerHTML = cartesianToLatLong();
                showPopupAnimation(true);
                clock.start();
              }
            }
          });
        }

        updateSize();
        render();
      }
    );

    function updateMousePosition(eX, eY) {
      const rect = containerEl.getBoundingClientRect();
      mouse.x = ((eX - rect.left) / containerEl.offsetWidth) * 2 - 1;
      mouse.y = -((eY - rect.top) / containerEl.offsetHeight) * 2 + 1;
    }

    function checkIntersects() {
      rayCaster.setFromCamera(mouse, camera);
      const intersects = rayCaster.intersectObject(globeMesh);
      if (intersects.length) {
        containerEl.style.cursor = "pointer";
      } else {
        containerEl.style.cursor = "auto";
      }
      return intersects;
    }

    function updateOverlayGraphic() {
      if (!pointer || isMobile) return;

      const activePointPosition = pointer.position.clone();
      activePointPosition.applyMatrix4(globe.matrixWorld);
      const activePointPositionProjected = activePointPosition.clone();
      activePointPositionProjected.project(camera);

      coordinates2D[0] = (activePointPositionProjected.x + 1) * containerEl.offsetWidth * 0.5;
      coordinates2D[1] = (1 - activePointPositionProjected.y) * containerEl.offsetHeight * 0.5;

      const matrixWorldInverse = controls.object.matrixWorldInverse;
      activePointPosition.applyMatrix4(matrixWorldInverse);

      if (activePointPosition.z > -1) {
        if (popupVisible === false) {
          popupVisible = true;
          showPopupAnimation(false);
        }

        let popupX = coordinates2D[0];
        popupX -= (activePointPositionProjected.x * containerEl.offsetWidth * 0.3);

        let popupY = coordinates2D[1];
        const upDown = (activePointPositionProjected.y > 0.6);
        popupY += (upDown ? 20 : -20);

        gsap.set(popupEl, {
          x: popupX,
          y: popupY,
          xPercent: -35,
          yPercent: upDown ? 0 : -100
        });

        popupY += (upDown ? -5 : 5);
        const curveMidX = popupX + activePointPositionProjected.x * 100;
        const curveMidY = popupY + (upDown ? -0.5 : 0.1) * coordinates2D[1];

        drawPopupConnector(coordinates2D[0], coordinates2D[1], curveMidX, curveMidY, popupX, popupY);
      } else {
        if (popupVisible) {
          popupOpenTl.pause(0);
          popupCloseTl.play(0);
        }
        popupVisible = false;
      }
    }

    function drawPopupConnector(startX, startY, midX, midY, endX, endY) {
      overlayCtx.strokeStyle = "#000000";
      overlayCtx.lineWidth = 3;
      overlayCtx.lineCap = "round";
      overlayCtx.clearRect(0, 0, containerEl.offsetWidth, containerEl.offsetHeight);
      overlayCtx.beginPath();
      overlayCtx.moveTo(startX, startY);
      overlayCtx.quadraticCurveTo(midX, midY, endX, endY);
      overlayCtx.stroke();
    }

    function cartesianToLatLong() {
      const pos = pointer.position;
      const lat = 90 - Math.acos(pos.y) * 180 / Math.PI;
      const lng = (270 + Math.atan2(pos.x, pos.z) * 180 / Math.PI) % 360 - 180;
      return formatCoordinate(lat, 'N', 'S') + ",&nbsp;" + formatCoordinate(lng, 'E', 'W');
    }

    function formatCoordinate(coordinate, positiveDirection, negativeDirection) {
      const direction = coordinate >= 0 ? positiveDirection : negativeDirection;
      return `${Math.abs(coordinate).toFixed(4)}°&nbsp;${direction}`;
    }

    function showPopupAnimation(lifted) {
      if (lifted) {
        let positionLifted = pointer.position.clone();
        positionLifted.multiplyScalar(1.3);
        gsap.from(pointer.position, {
          duration: 0.25,
          x: positionLifted.x,
          y: positionLifted.y,
          z: positionLifted.z,
          ease: "power3.out"
        });
      }
      popupCloseTl.pause(0);
      popupOpenTl.play(0);
    }

    function updateSize() {
      if (isMobile) {
        // Full screen background globe for mobile
        const width = window.innerWidth;
        const height = window.innerHeight;
        containerEl.style.width = `${width}px`;
        containerEl.style.height = `${height}px`;
        containerEl.style.position = 'fixed';
        containerEl.style.top = '0';
        containerEl.style.left = '0';
        containerEl.style.zIndex = '0';
        containerEl.style.opacity = '0.2';
        renderer.setSize(width, height);
        canvas2D.width = width;
        canvas2D.height = height;
        if (mapMaterial) {
          mapMaterial.uniforms.u_dot_size.value = 0.04 * Math.min(width, height);
        }
      } else {
        // Normal globe for desktop
        const globeSize = Math.min(containerEl.parentElement.offsetWidth * 0.3, 400);
        containerEl.style.width = `${globeSize}px`;
        containerEl.style.height = `${globeSize}px`;
        containerEl.style.position = 'relative';
        containerEl.style.opacity = '1';
        containerEl.style.zIndex = 'auto';
        renderer.setSize(globeSize, globeSize);
        canvas2D.width = globeSize;
        canvas2D.height = globeSize;
        if (mapMaterial) {
          mapMaterial.uniforms.u_dot_size.value = 0.04 * globeSize;
        }
      }
    }

    function render() {
      if (mapMaterial) {
        mapMaterial.uniforms.u_time_since_click.value = clock.getElapsedTime();
      }
      if (!isMobile) {
        checkIntersects();
        updateOverlayGraphic();
      }
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    window.addEventListener("resize", updateSize);

    // Cleanup function
    return () => {
      if (controls) controls.dispose();
      if (renderer) renderer.dispose();
      window.removeEventListener("resize", updateSize);
    };
  }, [isMobile]); // Add isMobile as dependency

  useEffect(() => {
    const sampleNotifications = [
      { id: 1, message: 'New royalty payment received', read: false },
      { id: 2, message: 'Your album is live on stores', read: false },
      { id: 3, message: 'CallerTune activation in progress', read: true },
    ];
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  const stats = [
    { title: "Today's Money", value: "$53,000", change: "+15%", icon: FiDollarSign, color: "from-[#005f73] to-[#0a9396]" },
    { title: "Today's Users", value: "2,300", change: "+3%", icon: FiUser, color: "from-[#005f73] to-[#0a9396]" },
    { title: "New Clients", value: "3,462", change: "-2%", icon: FiEye, color: "from-[#005f73] to-[#0a9396]" },
    { title: "Sales", value: "$103,430", change: "+5%", icon: FiTrendingUp, color: "from-[#005f73] to-[#0a9396]" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-50">
          <Navbar
            toggleSidebar={toggleSidebar}
            sidebarOpen={isSidebarOpen}
            notifications={notifications}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
          />
        </div>

        {/* Background Globe for Mobile */}
        {isMobile && (
          <div
            ref={globeWrapperRef}
            className="fixed inset-0 w-54 h-64 pointer-events-none"
          >
            <canvas
              ref={canvas3DRef}
              id="globe-3d"
              className="block absolute"
            />
            <canvas
              ref={canvas2DRef}
              id="globe-2d-overlay"
              className="block absolute pointer-events-none"
            />
          </div>
        )}

        <main className={`flex-1 overflow-y-auto p-4 md:p-6 text-gray-800 ${isMobile ? 'relative z-10' : ''}`}>
          {/* Welcome Section */}
          <div className={`p-6 rounded-xl mb-6 ${isMobile ? '' : 'bg-gradient-to-r from-[#005f73]/10 to-[#0a9396]/10'} shadow-lg`}>
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 mb-6 lg:mb-0">
                <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isMobile ? 'text-[#005f73]' : 'text-[#005f73]'}`}>
                  Welcome to The BLACK TURN Family
                </h1>
                <p className={`mb-4 ${isMobile ? 'text-[#005f73]' : 'text-[#005f73]'}`}>
                  Team on 9817889799 currently unavailable. For Urgent Inquiries WhatsApp us at 📞 9817889799.
                </p>
                <a
                  href="https://wa.me/919817889799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg bg-white text-[#005f73] font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  Contact on WhatsApp
                </a>
              </div>
              {/* Globe Container - Only for Desktop */}
              {!isMobile && (
                <div
                  ref={globeWrapperRef}
                  className="w-40 h-40 rounded-full overflow-hidden relative"
                  style={{ pointerEvents: 'auto' }}
                >
                  <canvas
                    ref={canvas3DRef}
                    id="globe-3d"
                    className="block absolute rounded-full"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <canvas
                    ref={canvas2DRef}
                    id="globe-2d-overlay"
                    className="block absolute pointer-events-none rounded-full"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div
                    id="globe-popup-overlay"
                    className="block absolute pointer-events-none rounded-full"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <div
                      ref={popupRef}
                      className="globe-popup absolute top-0 left-0 bg-white opacity-0 text-gray-900 font-sans px-2 py-1 text-sm rounded shadow-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Music Distribution Services Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            {/* Upload Album */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white mr-4">
                  <FiUploadCloud size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#005f73]">Upload Album</h3>
              </div>
              <p className="text-3xl font-bold mb-4">₹1999 <span className="text-sm font-normal">/ per Album</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Release Upto 7 Songs at Once</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>All Stores with CallerTune</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Multiple Artists</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>YouTube Content ID</span>
                </li>
              </ul>
              <Link to={'/upload_album'} className="w-full py-3 lg:px-55 md:px-20 px-10 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02]">
                Upload Album
              </Link>
            </div>

            {/* Premium Membership */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white mr-4">
                  <FiUser size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#005f73]">Become a Premium Member</h3>
              </div>

              <p className="text-3xl font-bold mb-6">₹4999 <span className="text-sm font-normal">/ per year</span></p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Unlimited Songs</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Unlimited Artists</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Bulk Uploads</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Prioritise Approvals</span>
                  </li>
                </ul>

                <ul className="space-y-3 mt-6 md:mt-0">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>No Per Year Charges</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>All Stores with CallerTune</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>YouTube Content ID</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Lyrics Distribution</span>
                  </li>
                </ul>
              </div>

              <div className="w-full flex justify-center">
                <Link
                  to="/BecomeAMembar"
                  className="w-full max-w-[600px] py-3 px-6 md:px-10 lg:px-[120px] bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Buy or Renew Membership (One Year Plan)
                </Link>
              </div>

            </div>


            {/* Single Songs — no changes mentioned in screenshot, keeping original content */}

          </div>


          <div className="p-6 rounded-xl bg-white border border-gray-200 mb-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white mr-4">
                <FiMusic size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#005f73]">Single Songs</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

              <Link to={'/singleSongWithCT'}>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-[#005f73] mb-1">With CallerTune</h4>
                  <p className="text-2xl font-bold mb-2">₹799 <span className="text-sm font-normal">/ per song</span></p>
                  <p className="text-sm text-gray-600 mb-1">Release on All Stores with CallerTune & Content ID</p>
                  <p className="text-xs text-gray-500 italic">Pay Onetime, Earn for Lifetime</p>
                </div>
              </Link>

              <Link to={'/singleSongWithoutCT'}>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-[#005f73] mb-1">Without CallerTune</h4>
                  <p className="text-2xl font-bold mb-2">₹599 <span className="text-sm font-normal">/ per song</span></p>
                  <p className="text-sm text-gray-600 mb-1">Release on All Stores without CallerTune & Content ID</p>
                  <p className="text-xs text-gray-500 italic">Pay Onetime, Earn for Lifetime</p>
                </div>
              </Link>

              <Link to={'/onlyCallerTune'}>
                <div className="p-4 mb-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-[#005f73] mb-1">CallerTune Only</h4>
                  <p className="text-2xl font-bold mb-2">₹499 <span className="text-sm font-normal">/ per CallerTune</span></p>
                  <p className="text-sm text-gray-600 mb-1">Release on All CallerTune Platforms</p>
                  <p className="text-xs text-gray-500 italic">Pay Onetime, Earn for Lifetime</p>
                </div>
              </Link>
            </div>
          </div>




          {/* YouTube Claim & Artist Services Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">


            {/* YouTube Claim Release */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white mr-4">
                  <FiYoutube size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#005f73]">YouTube Claim Release</h3>
              </div>
              <p className="text-gray-600 mb-6">Remove Claim from Your video</p>
              <div className="w-full flex justify-center">
                <Link
                  to="/youtubeClaim"
                  className="w-full max-w-[500px] py-3 px-6 sm:px-10 md:px-16 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Submit Link
                </Link>
              </div>

            </div>

            {/* Artist Profile Link */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white mr-4">
                  <FiUser size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#005f73]">Artist Profile Link</h3>
              </div>
              <p className="text-gray-600 mb-6">Link Your Correct Artist Profile</p>
              <div className="w-full flex justify-center">
                <Link
                  to="/artistprofilelink"
                  className="w-full max-w-[500px] py-3 px-6 sm:px-10 md:px-16 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Request Now
                </Link>
              </div>

            </div>

            {/* FB/Insta Whitelist */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white mr-4">
                  <FiShare2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#005f73]">FB/Insta Whitelist</h3>
              </div>
              <p className="text-gray-600 mb-6">Remove Claims from Reels</p>
              <div className="w-full flex justify-center">
                <Link
                  to="/pagewhitelist"
                  className="w-full max-w-[500px] py-3 px-6 sm:px-10 md:px-16 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Submit Now
                </Link>
              </div>

            </div>
          </div>


          {/* Additional Services Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Raise Complaint */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 text-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white inline-block mb-4">
                <FiAlertCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#005f73] mb-2">Raise a Complaint</h3>
              <p className="text-gray-600 mb-4">Any Issue or Help</p>
              <div className="w-full flex justify-center">
                <Link
                  to="/complaint"
                  className="w-full max-w-[500px] py-3 px-6 sm:px-10 md:px-16 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Submit Now
                </Link>
              </div>
            </div>

            {/* YouTube Whitelist */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 text-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white inline-block mb-4">
                <FiYoutube size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#005f73] mb-2">YouTube Whitelist</h3>
              <p className="text-gray-600 mb-4">Whitelist Your Artist Channel</p>
              <div className="w-full flex justify-center">
                <Link
                  to="/youtubeClaim"
                  className="w-full max-w-[500px] py-3 px-6 sm:px-10 md:px-16 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Submit Now
                </Link>
              </div>
            </div>

            {/* Song Takedown */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 text-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#005f73] to-[#0a9396] text-white inline-block mb-4">
                <FiTrash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#005f73] mb-2">Song Takedown</h3>
              <p className="text-gray-600 mb-4">Takedown Song from All Stores</p>
             <div className="w-full flex justify-center">
                <Link
                  to="/takedownrequest"
                  className="w-full max-w-[500px] py-3 px-6 sm:px-10 md:px-16 bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#0a9396] hover:to-[#005f73] text-white rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-[1.02]"
                >
                   Submit Request
                </Link>
              </div>
            </div>


          </div>

          {/* Recent Songs & Updates Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Recent Songs */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-bold text-[#005f73] mb-6 flex items-center">
                <FiMusic className="mr-2" /> Recent Songs | Submitted by you
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left">ISRC</th>
                      <th className="py-3 px-4 text-left">Song Name</th>
                      <th className="py-3 px-4 text-left">Artist</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-[#005f73]/5 transition-colors">
                      <td className="py-3 px-4 text-sm">IN1234567890</td>
                      <td className="py-3 px-4 font-medium">Summer Vibes</td>
                      <td className="py-3 px-4">DJ Black</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Live</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-[#005f73]/5 transition-colors">
                      <td className="py-3 px-4 text-sm">IN1234567891</td>
                      <td className="py-3 px-4 font-medium">Night Dreams</td>
                      <td className="py-3 px-4">Singer Blue</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Processing</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#005f73]/5 transition-colors">
                      <td className="py-3 px-4 text-sm">IN1234567892</td>
                      <td className="py-3 px-4 font-medium">Morning Melody</td>
                      <td className="py-3 px-4">Artist Green</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Live</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-bold text-[#005f73] mb-6 flex items-center">
                <FiBell className="mr-2" /> Recent Updates
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm text-gray-500">2025-06-26 14:53:36</span>
                    <span className="text-sm font-medium bg-[#005f73]/10 text-[#005f73] px-2 py-1 rounded">
                      Fill the NOC Form
                    </span>
                  </div>
                  <p className="text-gray-600">Please upload your NOC to proceed with releases.</p>
                </div>
                <div className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm text-gray-500">2025-06-25 11:20:15</span>
                    <span className="text-sm font-medium bg-[#005f73]/10 text-[#005f73] px-2 py-1 rounded">
                      Album Approved
                    </span>
                  </div>
                  <p className="text-gray-600">Your album 'Summer Hits' has been approved.</p>
                </div>
                <div className="pb-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm text-gray-500">2025-06-24 09:45:22</span>
                    <span className="text-sm font-medium bg-[#005f73]/10 text-[#005f73] px-2 py-1 rounded">
                      Payment Processed
                    </span>
                  </div>
                  <p className="text-gray-600">Your royalty payment has been processed.</p>
                </div>
              </div>
            </div>
          </div>



          {/* Sales Overview Section */}


          {/* Footer Info */}
          <div className="p-6 rounded-xl bg-white border border-gray-200 text-center">
            <p className="text-sm text-gray-500 mb-2">
              © 2025 BLACK TURN Music Distribution. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              For support: +91 9817889799 | Email: support@blackturn.com
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;