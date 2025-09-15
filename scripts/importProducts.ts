import { prisma } from '@/lib/prisma';

type ProductInput = {
  id: string;
  name: string;
  price: number;
  status: 'instock' | 'onsale' | 'backorder';
  brand: string;
  description?: string;
  images: string[];
  categorySlug: string;
  featured?: boolean;
  oldPrice?: number | null;
};

// Consolidated products (deduplicated). Prices in cents (KES * 100).
const hardcodedProducts: ProductInput[] = [

  {
    id: "airsec-floor-852-am-floor-system-1",
    name: "Airsec Floor-852 Am Floor System",
    price: 20475000,
    status: "instock" as const,
    brand: "Generic",
    description: "Airsec Floor-852 Am Floor System",
    images: ["https://picsum.photos/seed/cam1/600/400"],
    categorySlug: "anti-theft",
    featured: false,
  },

  {
    id: "795-072-morley-zx-loop-driver-card-for-morley-ias--2",
    name: "795-072 Morley ZX Loop Driver Card For Morley IAS Protocol",
    price: 2700000,
    status: "instock" as const,
    brand: "Honeywell",
    description: "795-072 Morley ZX Loop Driver Card For Morley IAS Protocol",
    images: ["/products/fireacc1.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "795-072-100-morley-loop-driver-card-for-morley-ias-3",
    name: "795-072-100 Morley Loop Driver Card For Morley IAS Protocol",
    price: 2850100,
    status: "instock" as const,
    brand: "Honeywell",
    description: "795-072-100 Morley Loop Driver Card For Morley IAS Protocol",
    images: ["/products/fireacc2.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "795-077-060-morley-zx-60-zone-led-card-4",
    name: "795-077-060 Morley ZX 60 Zone Led Card",
    price: 5305500,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "795-077-060 Morley ZX 60 Zone Led Card",
    images: ["/products/fireacc3.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "795-111-morley-two-loop-module-for-extension-for-d-5",
    name: "795-111 Morley Two Loop Module For Extension For DXC2",
    price: 3641500,
    status: "instock" as const,
    brand: "Honeywell",
    description: "795-111 Morley Two Loop Module For Extension For DXC2",
    images: ["/products/fireacc4.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "b401-system-sensor-plug-in-detector-base-6",
    name: "B401 System Sensor Plug-In Detector Base",
    price: 126700,
    status: "instock" as const,
    brand: "Honeywell",
    description: "B401 System Sensor Plug-In Detector Base",
    images: ["/products/fireacc5.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "beamlrk-system-sensor-long-range-kit-7",
    name: "BEAMLRK System Sensor Long Range Kit",
    price: 1266800,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "BEAMLRK System Sensor Long Range Kit",
    images: ["/products/fireacc6.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "beammmk-system-sensor-mounting-kit-8",
    name: "BEAMMMK System Sensor Mounting Kit",
    price: 7125300,
    status: "instock" as const,
    brand: "Honeywell",
    description: "BEAMMMK System Sensor Mounting Kit",
    images: ["/products/fireacc7.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "co1224tr-system-sensor-carbon-monoxide-detector-9",
    name: "CO1224TR System Sensor Carbon Monoxide Detector",
    price: 1852600,
    status: "instock" as const,
    brand: "Honeywell",
    description: "CO1224TR System Sensor Carbon Monoxide Detector",
    images: ["/products/fireacc8.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "fp200-prysmian-fire-resistant-cable-10",
    name: "FP200 Prysmian FIRe Resistant Cable",
    price: 3166800,
    status: "backorder" as const,
    brand: "Prysmian",
    description: "FP200 Prysmian FIRe Resistant Cable",
    images: ["/products/fireacc9.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "m200e-smb-morley-surface-mounting-box-11",
    name: "M200E-SMB Morley Surface Mounting Box",
    price: 95100,
    status: "instock" as const,
    brand: "Honeywell",
    description: "M200E-SMB Morley Surface Mounting Box",
    images: ["/products/fireacc10.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "mi-d240cm0-morley-single-240-v-ac-relay-module-12",
    name: "MI-D240CM0 Morley Single 240 V Ac Relay Module",
    price: 1346000,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MI-D240CM0 Morley Single 240 V Ac Relay Module",
    images: ["/products/fireacc11.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "mi-dczrm-morley-non-addressable-zone-monitor-modul-13",
    name: "MI-DCZRM Morley Non-Addressable Zone Monitor Module",
    price: 1583400,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MI-DCZRM Morley Non-Addressable Zone Monitor Module",
    images: ["/products/fireacc12.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "mi-diso-morley-ias-loop-isolation-module-14",
    name: "MI-DISO Morley IAS Loop Isolation Module",
    price: 491400,
    status: "backorder" as const,
    brand: "Honeywell",
    description: "MI-DISO Morley IAS Loop Isolation Module",
    images: ["/products/fireacc13.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "mi-dmm21-morley-2-input-monitor-module-15",
    name: "MI-DMM21 Morley 2-Input Monitor Module",
    price: 870900,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MI-DMM21 Morley 2-Input Monitor Module",
    images: ["/products/fireacc14.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "mi-dmmi-morley-interface-single-input-monitor-modu-16",
    name: "MI-DMMI Morley Interface – Single Input Monitor Module",
    price: 752100,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MI-DMMI Morley Interface – Single Input Monitor Module",
    images: ["/products/fireacc15.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "mus156-spare-en54-11-glass-pack-for-mcp-17",
    name: "MUS156 Spare En54-11 Glass Pack For Mcp",
    price: 39000,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MUS156 Spare En54-11 Glass Pack For Mcp",
    images: ["/products/fireacc16.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "ra100z-system-sensor-remote-annunciator-18",
    name: "RA100Z System Sensor Remote Annunciator",
    price: 316800,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "RA100Z System Sensor Remote Annunciator",
    images: ["/products/fireacc17.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
    oldPrice: 4199000,
  },

  {
    id: "kac-mcp1a-y470sg-14-yellow-extinguishant-release-c-19",
    name: "KAC MCP1A-Y470SG-14 Yellow Extinguishant Release Call Point",
    price: 264600,
    status: "instock" as const,
    brand: "Honeywell",
    description: "KAC MCP1A-Y470SG-14 Yellow Extinguishant Release Call Point",
    images: ["/products/break1.jpg"],
    categorySlug: "break-glass",
    featured: false,
  },

  {
    id: "mcp1a-r470fg-01-honeywell-conventional-flush-call--20",
    name: "MCP1A-R470FG-01 Honeywell Conventional Flush Call Point Notifier",
    price: 269200,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MCP1A-R470FG-01 Honeywell Conventional Flush Call Point Notifier",
    images: ["/products/break2.jpg"],
    categorySlug: "break-glass",
    featured: false,
  },

  {
    id: "mcp1a-r470fg-01-honeywell-conventional-flush-call--21",
    name: "MCP1A-R470FG-01 Honeywell Conventional Flush Call Point Notifier (alt)",
    price: 1050000,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "MCP1A-R470FG-01 Honeywell Conventional Flush Call Point Notifier (alt)",
    images: ["/products/break3.jpg"],
    categorySlug: "break-glass",
    featured: false,
  },

  {
    id: "ps200-kac-fire-alarm-call-point-cover-22",
    name: "PS200 KAC – Fire Alarm Call Point Cover",
    price: 92700,
    status: "instock" as const,
    brand: "Honeywell",
    description: "PS200 KAC – Fire Alarm Call Point Cover",
    images: ["/products/break4.jpg"],
    categorySlug: "break-glass",
    featured: false,
  },

  {
    id: "sr1t-morley-call-point-backbox-for-surface-mountin-23",
    name: "SR1T Morley Call Point Backbox For Surface Mounting",
    price: 71300,
    status: "instock" as const,
    brand: "Honeywell",
    description: "SR1T Morley Call Point Backbox For Surface Mounting",
    images: ["/products/break5.jpg"],
    categorySlug: "break-glass",
    featured: false,
  },

  {
    id: "w5a-rpo5sf-k013-morley-ias-addressable-glass-weath-24",
    name: "W5A-RPO5SF-K013 Morley IAS Addressable Glass Weatherproof Call Point",
    price: 1575000,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "W5A-RPO5SF-K013 Morley IAS Addressable Glass Weatherproof Call Point",
    images: ["/products/break6.jpg"],
    categorySlug: "break-glass",
    featured: false,
  },

  {
    id: "714-001-222-morley-dxc2-2-loop-addressable-control-25",
    name: "714-001-222 Morley DXC2 2 Loop Addressable Control Panel (Multi-Protocol)",
    price: 15000000,
    status: "instock" as const,
    brand: "Honeywell",
    description: "714-001-222 Morley DXC2 2 Loop Addressable Control Panel (Multi-Protocol)",
    images: ["/products/cont1.jpg"],
    categorySlug: "control-panels",
    featured: false,
  },

  {
    id: "hrz2e-morley-2-zone-conventional-fire-alarm-contro-26",
    name: "HRZ2E Morley 2 Zone Conventional FIRe Alarm Control Panel",
    price: 4217900,
    status: "instock" as const,
    brand: "Honeywell",
    description: "HRZ2E Morley 2 Zone Conventional FIRe Alarm Control Panel",
    images: ["/products/cont2.jpg"],
    categorySlug: "control-panels",
    featured: false,
  },

  {
    id: "hrz4e-morley-4-zone-conventional-fire-alarm-contro-27",
    name: "HRZ4E Morley 4 Zone Conventional FIRe Alarm Control Panel",
    price: 2700000,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "HRZ4E Morley 4 Zone Conventional FIRe Alarm Control Panel",
    images: ["/products/cont3.jpg"],
    categorySlug: "control-panels",
    featured: false,
    oldPrice: 4818400,
  },

  {
    id: "hrz8e-morley-8-zone-conventional-fire-alarm-contro-28",
    name: "HRZ8E Morley 8 Zone Conventional FIRe Alarm Control Panel",
    price: 3450000,
    status: "instock" as const,
    brand: "Honeywell",
    description: "HRZ8E Morley 8 Zone Conventional FIRe Alarm Control Panel",
    images: ["/products/cont4.jpg"],
    categorySlug: "control-panels",
    featured: false,
    oldPrice: 7766900,
  },

  {
    id: "zx5se-morley-1-5-loop-control-panel-29",
    name: "ZX5SE Morley 1-5 Loop Control Panel",
    price: 33000000,
    status: "instock" as const,
    brand: "Honeywell",
    description: "ZX5SE Morley 1-5 Loop Control Panel",
    images: ["/products/cont5.jpg"],
    categorySlug: "control-panels",
    featured: false,
    oldPrice: 50368500,
  },

  {
    id: "b501ap-iv-detector-base-30",
    name: "B501AP-IV Detector Base",
    price: 95100,
    status: "instock" as const,
    brand: "Pelco",
    description: "B501AP-IV Detector Base",
    images: ["product/s/det1.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "ec01003-system-sensor-conventional-optical-smoke-d-31",
    name: "EC01003 System Sensor Conventional Optical Smoke Detector",
    price: 316800,
    status: "instock" as const,
    brand: "Honeywell",
    description: "EC01003 System Sensor Conventional Optical Smoke Detector",
    images: ["/products/det2.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "ec01005-honeywell-temperature-heat-detector-32",
    name: "EC01005 Honeywell TeMPerature Heat Detector",
    price: 316800,
    status: "onsale" as const,
    brand: "Tiandy",
    description: "EC01005 Honeywell TeMPerature Heat Detector",
    images: ["/products/det3.jpg"],
    categorySlug: "detectors",
    featured: false,
    oldPrice: 1950000,
  },

  {
    id: "eco1002-system-sensor-conventional-multi-sensor-de-33",
    name: "ECO1002 System Sensor Conventional Multi-Sensor Detector – Smoke & Heat",
    price: 316800,
    status: "instock" as const,
    brand: "Honeywell",
    description: "ECO1002 System Sensor Conventional Multi-Sensor Detector – Smoke & Heat",
    images: ["/products/det4.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "hm-pse-s2-morley-smoke-detector-34",
    name: "HM-PSE-S2 Morley Smoke Detector",
    price: 554200,
    status: "instock" as const,
    brand: "Honeywell",
    description: "HM-PSE-S2 Morley Smoke Detector",
    images: ["/products/det5.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "hm-rhse-honeywell-addressable-heat-detector-hna-36-35",
    name: "HM-RHSE Honeywell Addressable Heat Detector Hna-360-H2",
    price: 554400,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "HM-RHSE Honeywell Addressable Heat Detector Hna-360-H2",
    images: ["/products/det6.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "mi-pse-s2-iv-morley-smoke-detector-optical-analogu-36",
    name: "MI-PSE-S2-IV Morley Smoke Detector Optical Analogue Addressable",
    price: 554200,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MI-PSE-S2-IV Morley Smoke Detector Optical Analogue Addressable",
    images: ["/products/det7.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "mi-ptse-s2-iv-morley-ias-multi-detector-37",
    name: "MI-PTSE-S2-IV Morley IAS Multi Detector",
    price: 475000,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MI-PTSE-S2-IV Morley IAS Multi Detector",
    images: ["/products/det8.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "mi-rhse-s2-iv-morley-thermal-rate-of-rise-detector-38",
    name: "MI-RHSE-S2-IV Morley Thermal Rate Of Rise Detector",
    price: 443400,
    status: "backorder" as const,
    brand: "Honeywell",
    description: "MI-RHSE-S2-IV Morley Thermal Rate Of Rise Detector",
    images: ["/products/det9.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "system-sensor-d2-duct-smoke-detector-2-wire-photoe-39",
    name: "System Sensor D2 Duct Smoke Detector, 2-WIRe, Photoelectric",
    price: 2264300,
    status: "instock" as const,
    brand: "Honeywell",
    description: "System Sensor D2 Duct Smoke Detector, 2-WIRe, Photoelectric",
    images: ["/products/det10.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "system-sensor-dnre-smoke-detector-40",
    name: "System Sensor Dnre Smoke Detector",
    price: 2375100,
    status: "instock" as const,
    brand: "Honeywell",
    description: "System Sensor Dnre Smoke Detector",
    images: ["/products/det11.jpg"],
    categorySlug: "detectors",
    featured: false,
  },

  {
    id: "morley-ias-mi-d2icmo-dual-input-single-output-modu-41",
    name: "Morley IAS MI-D2ICMO Dual Input Single Output Module",
    price: 1852700,
    status: "backorder" as const,
    brand: "Honeywell",
    description: "Morley IAS MI-D2ICMO Dual Input Single Output Module",
    images: ["/products/fire13.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "morley-ias-mi-dcmo-42",
    name: "Morley-IAS MI-DCMO",
    price: 870900,
    status: "instock" as const,
    brand: "Honeywell",
    description: "Morley-IAS MI-DCMO",
    images: ["/products/fire14.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "system-sensor-metal-sampling-tube-8-ft-to-12-ft-wi-43",
    name: "System Sensor Metal SaMPling Tube, 8 Ft. To 12 Ft. Width",
    price: 475000,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "System Sensor Metal SaMPling Tube, 8 Ft. To 12 Ft. Width",
    images: ["/products/fire17.jpg"],
    categorySlug: "fire-accessories",
    featured: false,
  },

  {
    id: "74430-88nm-enscape-conventional-sounders-44",
    name: "74430-88NM Enscape Conventional Sounders",
    price: 554300,
    status: "instock" as const,
    brand: "Honeywell",
    description: "74430-88NM Enscape Conventional Sounders",
    images: ["/products/sound1.jpg"],
    categorySlug: "sounders",
    featured: false,
  },

  {
    id: "cwso-rr-s1-honeywell-sounder-red-45",
    name: "CWSO-RR-S1 Honeywell Sounder, Red",
    price: 554300,
    status: "instock" as const,
    brand: "Honeywell",
    description: "CWSO-RR-S1 Honeywell Sounder, Red",
    images: ["/products/sound2.jpg"],
    categorySlug: "sounders",
    featured: false,
  },

  {
    id: "mi-bso-dd-n-kac-intelligent-detector-base-sounder--46",
    name: "MI-BSO-DD-N KAC Intelligent Detector Base Sounder Strobe",
    price: 712700,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "MI-BSO-DD-N KAC Intelligent Detector Base Sounder Strobe",
    images: ["/products/sound3.jpg"],
    categorySlug: "sounders",
    featured: false,
  },

  {
    id: "mi-wso-pr-n-morley-ias-wall-mounted-sounder-addres-47",
    name: "MI-WSO-PR-N Morley IAS Wall Mounted Sounder – Addressable – Red",
    price: 783900,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MI-WSO-PR-N Morley IAS Wall Mounted Sounder – Addressable – Red",
    images: ["/products/sound4.jpg"],
    categorySlug: "sounders",
    featured: false,
  },

  {
    id: "mi-wss-pr-n-morley-intelligent-wall-mounted-sounde-48",
    name: "MI-WSS-PR-N Morley Intelligent Wall Mounted Sounder Strobe",
    price: 1536000,
    status: "instock" as const,
    brand: "Honeywell",
    description: "MI-WSS-PR-N Morley Intelligent Wall Mounted Sounder Strobe",
    images: ["/products/sound5.jpg"],
    categorySlug: "sounders",
    featured: false,
  },

  {
    id: "wrr-morley-intelligent-loop-sounder-base-49",
    name: "WRR Morley Intelligent Loop Sounder Base",
    price: 110900,
    status: "onsale" as const,
    brand: "Honeywell",
    description: "WRR Morley Intelligent Loop Sounder Base",
    images: ["/products/sound6.jpg"],
    categorySlug: "sounders",
    featured: false,
  },

  {
    id: "akuvox-a05c-commercial-grade-access-control-termin-50",
    name: "Akuvox A05C commercial-grade access control terminal, access control via AI-powered face recognition",
    price: 2100000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox A05C commercial-grade access control terminal, access control via AI-powered face recognition",
    images: ["/products/inter1.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-c319-10-android-indoor-monitor-with-built-i-51",
    name: "Akuvox C319 10” Android indoor monitor with built-in voice assistant",
    price: 3345000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox C319 10” Android indoor monitor with built-in voice assistant",
    images: ["/products/inter2.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-e12-single-button-sip-video-door-phone-mobi-52",
    name: "Akuvox E12 single-button SIP video door phone, mobile access and wireless communication",
    price: 990000,
    status: "onsale" as const,
    brand: "Akuvox",
    description: "Akuvox E12 single-button SIP video door phone, mobile access and wireless communication",
    images: ["/products/inter3.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-e16c-face-recognition-mobile-access-tempera-53",
    name: "Akuvox E16C Face recognition, mobile access, temperature measurement, and mask detection in one device.",
    price: 4125000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox E16C Face recognition, mobile access, temperature measurement, and mask detection in one device.",
    images: ["/products/inter4.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-e18c-7-with-face-recognition-featuring-touc-54",
    name: "Akuvox E18C 7″ with face recognition featuring touchless building access and wireless communication",
    price: 5655000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox E18C 7″ with face recognition featuring touchless building access and wireless communication",
    images: ["/products/inter5.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-ip-video-intercom-kit-wi-fi-video-door-phon-55",
    name: "Akuvox IP Video Intercom Kit ,Wi-Fi video door phone ,a touchscreen monitor",
    price: 2145000,
    status: "onsale" as const,
    brand: "Akuvox",
    description: "Akuvox IP Video Intercom Kit ,Wi-Fi video door phone ,a touchscreen monitor",
    images: ["/products/inter6.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-r20a-sip-door-intercom-with-120-degree-wide-56",
    name: "Akuvox R20A SIP door intercom with 120 degree Wide-angle Video camera, Flush-mount casing",
    price: 2137800,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox R20A SIP door intercom with 120 degree Wide-angle Video camera, Flush-mount casing",
    images: ["/products/inter7.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-r20bx5-ip-video-intercom-with-5-keys-and-rf-57",
    name: "Akuvox R20BX5 IP Video Intercom with 5 keys and RFID",
    price: 2248500,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox R20BX5 IP Video Intercom with 5 keys and RFID",
    images: ["/products/inter8.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-r20k-sip-video-door-phone-with-numeric-keyp-58",
    name: "Akuvox R20K SIP Video Door Phone with Numeric Keypad",
    price: 2929400,
    status: "backorder" as const,
    brand: "Akuvox",
    description: "Akuvox R20K SIP Video Door Phone with Numeric Keypad",
    images: ["/products/inter9.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-r27a-ip-video-intercom-with-keypad-rfid-car-59",
    name: "Akuvox R27A IP video intercom with keypad (RFID card reader)",
    price: 3958500,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox R27A IP video intercom with keypad (RFID card reader)",
    images: ["/products/inter10.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-r28a-ip-video-intercom-2mp-camera-h-265-h-2-60",
    name: "Akuvox R28A IP Video Intercom (2MP camera, H.265 & H.264 decoding, 4.3 inch color display, RFID card reader, keypad)",
    price: 5250000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox R28A IP Video Intercom (2MP camera, H.265 & H.264 decoding, 4.3 inch color display, RFID card reader, keypad)",
    images: ["/products/inter11.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-r29ct-ip-video-door-phone-touch-display-dua-61",
    name: "Akuvox R29CT IP video door phone, touch display, dual camera, Facial Recognition, Finger Print, RFID card reader, pin code & Bluetooth",
    price: 12000000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox R29CT IP video door phone, touch display, dual camera, Facial Recognition, Finger Print, RFID card reader, pin code & Bluetooth",
    images: ["/products/inter12.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-s562-7-linux-indoor-monitor-with-compact-bo-62",
    name: "Akuvox S562 7″ Linux indoor monitor with compact body and stylish design",
    price: 930000,
    status: "backorder" as const,
    brand: "Akuvox",
    description: "Akuvox S562 7″ Linux indoor monitor with compact body and stylish design",
    images: ["/products/inter13.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "akuvox-sp-r50p-advanced-telephony-63",
    name: "Akuvox SP-R50P advanced telephony",
    price: 555000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox SP-R50P advanced telephony",
    images: ["/products/inter14.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "ara10-w-dahua-technology-dhi-wireless-siren-64",
    name: "ARA10-W Dahua Technology Dhi- WIReless SIRen",
    price: 360300,
    status: "instock" as const,
    brand: "Dahua",
    description: "ARA10-W Dahua Technology Dhi- WIReless SIRen",
    images: ["/products/inter15.jpg"],
    categorySlug: "intercom",
    featured: false,
    oldPrice: 514600,
  },

  {
    id: "arc5408b-cw-dahua-network-video-alarm-controller-65",
    name: "ARC5408B-CW Dahua Network Video Alarm Controller",
    price: 1729200,
    status: "instock" as const,
    brand: "Dahua",
    description: "ARC5408B-CW Dahua Network Video Alarm Controller",
    images: ["/products/inter16.jpg"],
    categorySlug: "intercom",
    featured: false,
    oldPrice: 2470200,
  },

  {
    id: "arc5808c-c-dahua-intelligent-building-security-ala-66",
    name: "ARC5808C-C Dahua Intelligent Building Security Alarm Controller",
    price: 3150000,
    status: "onsale" as const,
    brand: "Dahua",
    description: "ARC5808C-C Dahua Intelligent Building Security Alarm Controller",
    images: ["/products/inter17.jpg"],
    categorySlug: "intercom",
    featured: false,
  },

  {
    id: "bdcom-s1200-16p2g1s-16-port-unmanaged-poe-switch-w-67",
    name: "BDCOM S1200-16P2G1S 16-Port Unmanaged PoE Switch with SFP and 180W PoE Budget",
    price: 926500,
    status: "instock" as const,
    brand: "BDCOM",
    description: "BDCOM S1200-16P2G1S 16-Port Unmanaged PoE Switch with SFP and 180W PoE Budget",
    images: ["/products/switch1.jpg"],
    categorySlug: "switches",
    featured: false,
  },

  {
    id: "bdcom-s1200-24p2g1s-24-port-unmanaged-poe-switch-w-68",
    name: "BDCOM S1200-24P2G1S 24-Port Unmanaged PoE Switch with SFP and 280W PoE Budget",
    price: 1174500,
    status: "instock" as const,
    brand: "BDCOM",
    description: "BDCOM S1200-24P2G1S 24-Port Unmanaged PoE Switch with SFP and 280W PoE Budget",
    images: ["/products/switch2.jpg"],
    categorySlug: "switches",
    featured: false,
  },

  {
    id: "bdcom-s1200-24p2g1s-370-24-port-unmanaged-poe-swit-69",
    name: "BDCOM S1200-24P2G1S-370 24-Port Unmanaged PoE Switch with SFP and 370W PoE Budget",
    price: 1370500,
    status: "onsale" as const,
    brand: "BDCOM",
    description: "BDCOM S1200-24P2G1S-370 24-Port Unmanaged PoE Switch with SFP and 370W PoE Budget",
    images: ["/products/switch3.jpg"],
    categorySlug: "switches",
    featured: false,
  },

  {
    id: "bdcom-s1500-16p2s-16-port-unmanaged-poe-switch-wit-70",
    name: "BDCOM S1500-16P2S 16-Port Unmanaged PoE Switch with SFP and 180W PoE Budget",
    price: 1396500,
    status: "instock" as const,
    brand: "BDCOM",
    description: "BDCOM S1500-16P2S 16-Port Unmanaged PoE Switch with SFP and 180W PoE Budget",
    images: ["/products/switch4.jpg"],
    categorySlug: "switches",
    featured: false,
  },

  {
    id: "bdcom-s1500-24p2s-370-24-port-unmanaged-poe-switch-71",
    name: "BDCOM S1500-24P2S-370 24-Port Unmanaged PoE Switch with SFP and 370W PoE Budget",
    price: 1762000,
    status: "instock" as const,
    brand: "BDCOM",
    description: "BDCOM S1500-24P2S-370 24-Port Unmanaged PoE Switch with SFP and 370W PoE Budget",
    images: ["/products/switch5.jpg"],
    categorySlug: "switches",
    featured: false,
  },

  {
    id: "bdcom-wap2100-t630b-wi-fi-broadcast-72",
    name: "BDCOM WAP2100-T630B Wi-Fi Broadcast",
    price: 822200,
    status: "instock" as const,
    brand: "BDCOM",
    description: "BDCOM WAP2100-T630B Wi-Fi Broadcast",
    images: ["/products/network1.jpg"],
    categorySlug: "wireless-routers",
    featured: false,
  },

  {
    id: "wi-r2-wi-tek-wifi-router-73",
    name: "WI-R2 WI-TEK WiFi Router",
    price: 334600,
    status: "instock" as const,
    brand: "Witek",
    description: "WI-R2 WI-TEK WiFi Router",
    images: ["/products/network2.jpg"],
    categorySlug: "wireless-routers",
    featured: false,
  },

  {
    id: "6-core-alarm-cable-white-100mt-coil-alarm-cable-6--74",
    name: "6 Core Alarm Cable White (100Mt Coil) Alarm Cable 6 Cores",
    price: 180000,
    status: "instock" as const,
    brand: "Generic",
    description: "6 Core Alarm Cable White (100Mt Coil) Alarm Cable 6 Cores",
    images: ["/products/accessories1.jpg"],
    categorySlug: "accessories",
    featured: false,
  },

  {
    id: "arm808-dahua-security-cctv-8-zone-expansion-module-75",
    name: "ARM808 Dahua Security Cctv 8-Zone Expansion Module (Mbus)",
    price: 332500,
    status: "instock" as const,
    brand: "Dahua",
    description: "ARM808 Dahua Security Cctv 8-Zone Expansion Module (Mbus)",
    images: ["/products/accessories2.jpg"],
    categorySlug: "accessories",
    featured: false,
  },

  {
    id: "asm100-dahua-mifare-card-reader-and-writer-76",
    name: "ASM100 Dahua Mifare Card Reader And Writer",
    price: 720400,
    status: "onsale" as const,
    brand: "Dahua",
    description: "ASM100 Dahua Mifare Card Reader And Writer",
    images: ["/products/accessories2.jpg"],
    categorySlug: "accessories",
    featured: false,
  },

  {
    id: "dash-camera-g300h-pro-77",
    name: "Dash Camera (G300H Pro)",
    price: 899381,
    status: "instock" as const,
    brand: "Botslab",
    description: "Dash Camera (G300H Pro)",
    images: ["/products/dash1.jpg"],
    categorySlug: "dash-cameras",
    featured: false,
  },

  {
    id: "dash-camera-g500h-pro-78",
    name: "Dash Camera (G500H Pro)",
    price: 1160070,
    status: "onsale" as const,
    brand: "Botslab",
    description: "Dash Camera (G500H Pro)",
    images: ["/products/dash2.jpg"],
    categorySlug: "dash-cameras",
    featured: false,
  },

  {
    id: "dash-camera-g980h-with-64-gb-sd-card-79",
    name: "Dash Camera (G980H) with 64 GB SD Card",
    price: 1629313,
    status: "backorder" as const,
    brand: "Botslab",
    description: "Dash Camera (G980H) with 64 GB SD Card",
    images: ["/products/dash3.jpg"],
    categorySlug: "dash-cameras",
    featured: false,
  },

  {
    id: "dash-camera-hk30-pro-80",
    name: "Dash Camera (HK30 Pro)",
    price: 586552,
    status: "instock" as const,
    brand: "Botslab",
    description: "Dash Camera (HK30 Pro)",
    images: ["/products/dash4.jpg"],
    categorySlug: "dash-cameras",
    featured: false,
  },

  {
    id: "dss7016dr-dahua-dss-pro-digital-surveillance-syste-81",
    name: "DSS7016DR Dahua Dss Pro Digital Surveillance System",
    price: 49877100,
    status: "instock" as const,
    brand: "Dahua",
    description: "DSS7016DR Dahua Dss Pro Digital Surveillance System",
    images: ["/products/ivs1.jpg"],
    categorySlug: "ivs",
    featured: false,
  },

  {
    id: "mpt300wa-mpt-hd-mobile-portable-terminal-mpt300-82",
    name: "MPT300WA MPt HD Mobile Portable Terminal MPt300",
    price: 12350500,
    status: "instock" as const,
    brand: "MPT",
    description: "MPT300WA MPt HD Mobile Portable Terminal MPt300",
    images: ["/products/mobile1.jpg"],
    categorySlug: "mobile-traffic",
    featured: false,
  },

  {
    id: "4mp-fixed-ir-dome-camera-83",
    name: "4MP Fixed IR Dome Camera",
    price: 1290000,
    status: "instock" as const,
    brand: "Tiandy",
    description: "4MP Fixed IR Dome Camera",
    images: ["/products/net1.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "4mp-fixed-ir-bullet-camera-84",
    name: "4MP Fixed IR Bullet Camera",
    price: 1430000,
    status: "instock" as const,
    brand: "Tiandy",
    description: "4MP Fixed IR Bullet Camera",
    images: ["/products/net2.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "4mp-motorized-ir-bullet-camera-85",
    name: "4MP Motorized IR Bullet Camera",
    price: 1788000,
    status: "onsale" as const,
    brand: "Tiandy",
    description: "4MP Motorized IR Bullet Camera",
    images: ["/products/net3.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "4mp-motorized-ir-dome-camera-86",
    name: "4MP Motorized IR Dome Camera",
    price: 1760000,
    status: "instock" as const,
    brand: "Tiandy",
    description: "4MP Motorized IR Dome Camera",
    images: ["/products/net4.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "5mp-motorized-starlight-ir-camera-87",
    name: "5MP Motorized Starlight IR Camera",
    price: 2125000,
    status: "instock" as const,
    brand: "Tiandy",
    description: "5MP Motorized Starlight IR Camera",
    images: ["/products/net5.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "5mp-super-starlight-motorized-ir-bullet-camera-88",
    name: "5MP Super Starlight Motorized IR Bullet Camera",
    price: 2650000,
    status: "onsale" as const,
    brand: "Tiandy",
    description: "5MP Super Starlight Motorized IR Bullet Camera",
    images: ["/products/net6.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "5mp-super-starlight-motorized-ir-dome-camera-89",
    name: "5MP Super Starlight Motorized IR Dome Camera",
    price: 2320000,
    status: "instock" as const,
    brand: "Tiandy",
    description: "5MP Super Starlight Motorized IR Dome Camera",
    images: ["/products/net7.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "6-core-alarm-cable-white-100m-90",
    name: "6 Core Alarm Cable White 100m",
    price: 690000,
    status: "instock" as const,
    brand: "Generic",
    description: "6 Core Alarm Cable White 100m",
    images: ["/products/net8.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "adx812-16-v3-16ch-hd-video-decoder-91",
    name: "ADX812-16 V3 16ch HD Video Decoder",
    price: 4180000,
    status: "backorder" as const,
    brand: "Generic",
    description: "ADX812-16 V3 16ch HD Video Decoder",
    images: ["/products/net9.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "akuvox-a05s-commercial-access-control-face-qr-92",
    name: "Akuvox A05S Commercial Access Control (Face + QR)",
    price: 9430000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox A05S Commercial Access Control (Face + QR)",
    images: ["/products/net10.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "akuvox-c319-10-android-indoor-monitor-93",
    name: "Akuvox C319 10\" Android Indoor Monitor",
    price: 13450000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox C319 10\" Android Indoor Monitor",
    images: ["/products/net11.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "akuvox-e12-single-button-video-doorbell-94",
    name: "Akuvox E12 Single-Button Video Doorbell",
    price: 2650000,
    status: "instock" as const,
    brand: "Akuvox",
    description: "Akuvox E12 Single-Button Video Doorbell",
    images: ["/products/net12.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "akuvox-e16c-face-recognition-door-phone-95",
    name: "Akuvox E16C Face Recognition Door Phone",
    price: 17600000,
    status: "backorder" as const,
    brand: "Akuvox",
    description: "Akuvox E16C Face Recognition Door Phone",
    images: ["/products/net13.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "2mp-fixed-ir-dome-camera-96",
    name: "2MP Fixed IR Dome Camera",
    price: 920000,
    status: "instock" as const,
    brand: "Dahua",
    description: "2MP Fixed IR Dome Camera",
    images: ["/products/net14.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "2mp-fixed-ir-bullet-camera-97",
    name: "2MP Fixed IR Bullet Camera",
    price: 980000,
    status: "instock" as const,
    brand: "Dahua",
    description: "2MP Fixed IR Bullet Camera",
    images: ["/products/net5.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "8mp-motorized-varifocal-dome-98",
    name: "8MP Motorized Varifocal Dome",
    price: 4635000,
    status: "instock" as const,
    brand: "Hikvision",
    description: "8MP Motorized Varifocal Dome",
    images: ["/products/net6.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "8mp-colorvu-bullet-camera-99",
    name: "8MP ColorVu Bullet Camera",
    price: 3899000,
    status: "onsale" as const,
    brand: "Hikvision",
    description: "8MP ColorVu Bullet Camera",
    images: ["/products/net7.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "4mp-lighthunter-bullet-100",
    name: "4MP LightHunter Bullet",
    price: 2246000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "4MP LightHunter Bullet",
    images: ["/products/net8.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "4mp-lighthunter-dome-101",
    name: "4MP LightHunter Dome",
    price: 2199000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "4MP LightHunter Dome",
    images: ["/products/net9.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "ezviz-c3tn-2mp-outdoor-102",
    name: "EZVIZ C3TN 2MP Outdoor",
    price: 655000,
    status: "instock" as const,
    brand: "EZVIZ",
    description: "EZVIZ C3TN 2MP Outdoor",
    images: ["/products/net10.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "ezviz-c8c-2mp-pan-tilt-103",
    name: "EZVIZ C8C 2MP Pan & Tilt",
    price: 1150000,
    status: "instock" as const,
    brand: "EZVIZ",
    description: "EZVIZ C8C 2MP Pan & Tilt",
    images: ["/products/net11.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "bdcom-poe-switch-16-port-104",
    name: "BDCOM PoE Switch 16-Port",
    price: 2850000,
    status: "instock" as const,
    brand: "BDCOM",
    description: "BDCOM PoE Switch 16-Port",
    images: ["/products/net12.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "cat6-utp-cable-305m-105",
    name: "Cat6 UTP Cable 305m",
    price: 1690000,
    status: "instock" as const,
    brand: "Generic",
    description: "Cat6 UTP Cable 305m",
    images: ["/products/net13.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "network-video-recorder-16ch-106",
    name: "Network Video Recorder 16CH",
    price: 5590000,
    status: "backorder" as const,
    brand: "Generic",
    description: "Network Video Recorder 16CH",
    images: ["/products/net14.jpg"],
    categorySlug: "network-cameras",
    featured: false,
  },

  {
    id: "adu8712-e-v3-uniview-12-channel-high-definition-vi-107",
    name: "ADU8712-E-V3 Uniview 12 Channel High Definition Video Decoder",
    price: 25500000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "ADU8712-E-V3 Uniview 12 Channel High Definition Video Decoder",
    images: ["/products/nvr1.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "ds-7608ni-i2-8p-hikvision-8-ch-1u-8-poe-4k-nvr-108",
    name: "DS-7608NI-I2/8P Hikvision 8-ch 1U 8 PoE 4K NVR",
    price: 3120000,
    status: "instock" as const,
    brand: "HIKVISION",
    description: "DS-7608NI-I2/8P Hikvision 8-ch 1U 8 PoE 4K NVR",
    images: ["/products/nvr2.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "longse-bmscthc200fpew-5mp-lite-outdoor-full-color--109",
    name: "Longse BMSCTHC200FPEW 5MP Lite Outdoor Full Color Fixed Bullet HD Camera",
    price: 265000,
    status: "onsale" as const,
    brand: "Longse",
    description: "Longse BMSCTHC200FPEW 5MP Lite Outdoor Full Color Fixed Bullet HD Camera",
    images: ["/products/nvr3.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "longse-xvrt3008d-8ch-hybrid-video-recorder-110",
    name: "Longse XVRT3008D 8CH Hybrid Video Recorder",
    price: 530000,
    status: "instock" as const,
    brand: "Longse",
    description: "Longse XVRT3008D 8CH Hybrid Video Recorder",
    images: ["/products/nvr4.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "nvr302-16s2-p16-uniview-16-channel-4k-nvr-with-poe-111",
    name: "NVR302-16S2-P16 Uniview 16 Channel 4K NVR with PoE",
    price: 2730000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "NVR302-16S2-P16 Uniview 16 Channel 4K NVR with PoE",
    images: ["/products/nvr5.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "nvr4816-16p-4k-dahua-ip-nvr-dvr-recorder-16-channe-112",
    name: "NVR4816-16P-4K Dahua IP NVR / Dvr / Recorder. 16 Channel.",
    price: 4610800,
    status: "onsale" as const,
    brand: "Dahua",
    description: "NVR4816-16P-4K Dahua IP NVR / Dvr / Recorder. 16 Channel.",
    images: ["/products/nvr6.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "nvr502-32b-p16-uniview-16-channel-nvr-high-mbps-hi-113",
    name: "NVR502-32B-P16 Uniview 16 Channel NVR, High Mbps, High Decoding, PoE, NDAA",
    price: 3900000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "NVR502-32B-P16 Uniview 16 Channel NVR, High Mbps, High Decoding, PoE, NDAA",
    images: ["/products/nvr7.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "reolink-nvs12w-12-channel-wi-fi-6-nvr-recorder-114",
    name: "Reolink NVS12W 12-Channel Wi-Fi 6 NVR Recorder",
    price: 2610000,
    status: "instock" as const,
    brand: "Reolink",
    description: "Reolink NVS12W 12-Channel Wi-Fi 6 NVR Recorder",
    images: ["/products/nvr8.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "unicorn-video-management-server-vms-from-uniview-115",
    name: "Unicorn Video Management Server VMS from Uniview",
    price: 52650000,
    status: "backorder" as const,
    brand: "UNIVIEW",
    description: "Unicorn Video Management Server VMS from Uniview",
    images: ["/products/nvr9.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "uniview-nvr301-16s3-4k-network-video-recorder-116",
    name: "Uniview NVR301-16S3 4K Network Video Recorder",
    price: 720000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "Uniview NVR301-16S3 4K Network Video Recorder",
    images: ["/products/nvr10.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "uniview-nvr302-32s-32-channel-2-hdd-nvr-117",
    name: "Uniview NVR302-32S 32 Channel 2 HDD NVR",
    price: 1572000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "Uniview NVR302-32S 32 Channel 2 HDD NVR",
    images: ["/products/nvr11.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "uniview-nvr508-64b-unv-64-channel-4k-nvr-up-to-12m-118",
    name: "Uniview NVR508-64B UNV 64 Channel 4K NVR up to 12MP, Ultra265, H.265",
    price: 5250000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "Uniview NVR508-64B UNV 64 Channel 4K NVR up to 12MP, Ultra265, H.265",
    images: ["/products/nvr12.jpg"],
    categorySlug: "nvr",
    featured: false,
  },

  {
    id: "dahua-ptz1c200ue-gn-2mp-starlight-ir-ptz-network-c-119",
    name: "Dahua PTZ1C200UE-GN 2MP Starlight IR PTZ Network Camera",
    price: 7570000,
    status: "onsale" as const,
    brand: "Dahua",
    description: "Dahua PTZ1C200UE-GN 2MP Starlight IR PTZ Network Camera",
    images: ["/products/ptz1.jpg"],
    categorySlug: "ptz-cameras",
    featured: false,
    oldPrice: 8250000,
  },

  {
    id: "ipc6252sr-x22ug-uniview-outdoor-ptz-ip-security-ca-120",
    name: "IPC6252SR-X22UG Uniview Outdoor PTZ IP Security Camera",
    price: 9263000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "IPC6252SR-X22UG Uniview Outdoor PTZ IP Security Camera",
    images: ["/products/ptz2.jpg"],
    categorySlug: "ptz-cameras",
    featured: false,
  },

  {
    id: "ipc6252sl-x33up-uniview-2mp-starlight-laser-ir-net-121",
    name: "IPC6252SL-X33UP Uniview 2MP Starlight Laser IR Network PTZ Dome",
    price: 22643000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "IPC6252SL-X33UP Uniview 2MP Starlight Laser IR Network PTZ Dome",
    images: ["/products/ptz3.jpg"],
    categorySlug: "ptz-cameras",
    featured: false,
  },

  {
    id: "ipc6852sr-x44u-uniview-2mp-44x-starlight-network-p-122",
    name: "IPC6852SR-X44U Uniview 2MP 44X Starlight Network PTZ Dome",
    price: 22643000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "IPC6852SR-X44U Uniview 2MP 44X Starlight Network PTZ Dome",
    images: ["/products/ptz4.jpg"],
    categorySlug: "ptz-cameras",
    featured: false,
  },

  {
    id: "ipc7622er-x44-vf-2mp-44x-lighthunter-network-posit-123",
    name: "IPC7622ER-X44-VF 2MP 44X Lighthunter Network Positioning System",
    price: 27300000,
    status: "instock" as const,
    brand: "UNIVIEW",
    description: "IPC7622ER-X44-VF 2MP 44X Lighthunter Network Positioning System",
    images: ["/products/ptz5.jpg"],
    categorySlug: "ptz-cameras",
    featured: false,
  },

  {
    id: "sd6al245u-hni-dahua-2mp-45x-starlight-laser-ptz-ne-124",
    name: "SD6AL245U-HNI Dahua 2MP 45X Starlight Laser PTZ Network Camera",
    price: 16626000,
    status: "onsale" as const,
    brand: "Dahua",
    description: "SD6AL245U-HNI Dahua 2MP 45X Starlight Laser PTZ Network Camera",
    images: ["/products/ptz6.jpg"],
    categorySlug: "ptz-cameras",
    featured: false,
    oldPrice: 18650000,
  },

  {
    id: "sd6aw230-hni-dahua-2mp-ptz-dome-camera-125",
    name: "SD6AW230-HNI Dahua 2MP PTZ Dome Camera",
    price: 5960000,
    status: "onsale" as const,
    brand: "Dahua",
    description: "SD6AW230-HNI Dahua 2MP PTZ Dome Camera",
    images: ["/products/ptz7.jpg"],
    categorySlug: "ptz-cameras",
    featured: false,
    oldPrice: 6600000,
  },

  {
    id: "ess1508c-dahua-disk-array-48-tb-126",
    name: "ESS1508C Dahua Disk Array 48 TB",
    price: 3491400,
    status: "onsale" as const,
    brand: "Dahua",
    description: "ESS1508C Dahua Disk Array 48 TB",
    images: ["/products/storage1.jpg"],
    categorySlug: "storage",
    featured: false,
    oldPrice: 4987700,
  },

];


async function importProducts() {
  console.log('Starting product import...');

  try {
    for (const productData of hardcodedProducts) {
      // Find category
      let category = await prisma.category.findUnique({
        where: { slug: productData.categorySlug }
      });

      if (!category) {
        console.warn(`Category ${productData.categorySlug} not found for product ${productData.name}. Creating it...`);
        category = await prisma.category.create({
          data: {
            name: productData.categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            slug: productData.categorySlug
          }
        });
      }

      // Check if product already exists
      const existingProduct = await prisma.product.findUnique({
        where: { id: productData.id }
      });

      if (existingProduct) {
        console.log(`Updating existing product: ${productData.name}`);
        // Update product (your corrected update block)
        await prisma.product.update({
          where: { id: productData.id },
          data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            status: productData.status,
            brand: productData.brand,
            category: {
              connect: { id: category.id }
            },
            featured: productData.featured,
            images: {
              deleteMany: {},
              create: productData.images.map(url => ({ url }))
            },
            oldPrice: productData.oldPrice ?? null
          }
        });
      } else {
        console.log(`Creating new product: ${productData.name}`);
        // Create new product (your corrected create block)
        await prisma.product.create({
          data: {
            id: productData.id,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            status: productData.status,
            brand: productData.brand,
            category: {
              connect: { id: category.id }
            },
            featured: productData.featured,
            images: {
              create: productData.images.map(url => ({ url }))
            },
            oldPrice: productData.oldPrice ?? null
          }
        });
      }
    }

    console.log('✅ All products imported successfully!');
    console.log(`📊 Total products imported: ${hardcodedProducts.length}`);

  } catch (error) {
    console.error('❌ Error importing products:', error);
    throw error;
  }
}

// Run the import
importProducts()
  .catch((error) => {
    console.error('Failed to import products:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });