/* ==========================================================================
   DANTAM DENTAL CLINICS - WISDOM TOOTH REMOVAL LANDING PAGE INTERACTIVE JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------------------- */
  /* 1. MODAL SYSTEM (APPOINTMENT & COST ESTIMATOR)                             */
  /* -------------------------------------------------------------------------- */
  const modals = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close');
  const triggerBtns = document.querySelectorAll('[data-modal-target]');

  function openModal(modalId, presetConcern = '') {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (presetConcern && modal.querySelector('#mainConcern')) {
        const concernSelect = modal.querySelector('#mainConcern');
        for (let i = 0; i < concernSelect.options.length; i++) {
          if (concernSelect.options[i].value.toLowerCase().includes(presetConcern.toLowerCase())) {
            concernSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const presetConcern = btn.getAttribute('data-concern') || '';
      openModal(targetId, presetConcern);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => closeModal(modal));
    }
  });

  /* -------------------------------------------------------------------------- */
  /* 2. APPOINTMENT FORM SUBMISSION HANDLING                                   */
  /* -------------------------------------------------------------------------- */
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = appointmentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Scheduling Consultation...</span>';

      setTimeout(() => {
        appointmentForm.innerHTML = `
          <div style="text-align: center; padding: 24px 12px;">
            <div style="width: 64px; height: 64px; background-color: #EEF7F6; color: #0A7476; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <h3 style="color: #043839; font-size: 1.5rem; margin-bottom: 8px;">Consultation Request Received!</h3>
            <p style="color: #485A59; font-size: 0.95rem; margin-bottom: 24px;">Our Dantam patient care team in Hyderabad will contact you within 30 minutes to confirm your preferred slot.</p>
            <button class="btn btn-primary" onclick="location.reload()">Done</button>
          </div>
        `;
      }, 1200);
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 3. COST ESTIMATOR INTERACTIVE LOGIC                                       */
  /* -------------------------------------------------------------------------- */
  const costForm = document.getElementById('costEstimatorForm');
  const costResultBox = document.getElementById('costEstimateResult');

  if (costForm) {
    costForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const toothCount = parseInt(document.getElementById('toothCount').value || '1');
      const extractionType = document.getElementById('extractionType').value;
      const requiresScan = document.getElementById('requiresScan').value;

      let estimateMin = 0;
      let estimateMax = 0;

      if (extractionType === 'simple') {
        estimateMin = 2500 * toothCount;
        estimateMax = 4500 * toothCount;
      } else if (extractionType === 'surgical') {
        estimateMin = 4500 * toothCount;
        estimateMax = 8500 * toothCount;
      } else {
        estimateMin = 3500 * toothCount;
        estimateMax = 7000 * toothCount;
      }

      if (requiresScan === 'yes') {
        estimateMin += 1500;
        estimateMax += 2500;
      }

      costResultBox.style.display = 'block';
      costResultBox.innerHTML = `
        <div style="background-color: #EEF7F6; border: 2px solid #0A7476; padding: 24px; border-radius: 16px; margin-top: 20px; text-align: center;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #0A7476; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Clinical Range</span>
          <h3 style="font-size: 1.75rem; color: #043839; margin: 8px 0;">₹${estimateMin.toLocaleString('en-IN')} - ₹${estimateMax.toLocaleString('en-IN')}</h3>
          <p style="font-size: 0.85rem; color: #485A59; margin-bottom: 16px;">*Includes clinical evaluation guidance. Final estimate determined after physical OPG/CBCT diagnosis.</p>
          <button class="btn btn-primary btn-sm" data-modal-target="appointment-modal" onclick="document.getElementById('cost-modal').classList.remove('active'); document.getElementById('appointment-modal').classList.add('active');">Book Consultation for Exact Estimate</button>
        </div>
      `;
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 4. ACCORDION FAQ SYSTEM                                                   */
  /* -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 5. HYDERABAD CLINIC LOCATION TAB SWITCHER                                 */
  /* -------------------------------------------------------------------------- */
  const locationTabs = document.querySelectorAll('.tab-btn');
  const locationTitle = document.getElementById('locationTitle');
  const locationAddress = document.getElementById('locationAddress');
  const locationPhone = document.getElementById('locationPhone');
  const locationMap = document.getElementById('locationMapFrame');
  const locationDirectionsBtn = document.getElementById('locationDirectionsBtn');

  const locationData = {
    gachibowli: {
      title: "Dantam Dental Clinic - Gachibowli",
      address: "1st Floor, Opposite Jayaberi Apartment, Anjaiah Nagar, Near SLN Terminal, Gachibowli, Hyderabad - 500032",
      phone: "+91 78424 66668",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.452661595188!2d78.3614!3d17.4401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzI0LjQiTiA3OMKwMjEnNDEuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dantam+Dental+Clinic+Gachibowli+Hyderabad&daddr=1st+Floor,+Opposite+Jayaberi+Apartment,+Anjaiah+Nagar,+Near+SLN+Terminal,+Gachibowli,+Hyderabad+-+500032"
    },
    kondapur: {
      title: "Dantam Dental Clinic - Kondapur",
      address: "2nd Floor, Main Road, Near Botanika Gardens, Kondapur, Hyderabad - 500084",
      phone: "+91 78424 66668",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.36!3d17.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI3JzM2LjAiTiA3OMKwMjEnMzYuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dantam+Dental+Clinic+Kondapur+Hyderabad&daddr=2nd+Floor,+Main+Road,+Near+Botanika+Gardens,+Kondapur,+Hyderabad+-+500084"
    },
    tellapur: {
      title: "Dantam Dental Clinic - Tellapur",
      address: "Near My Home Sayuk & Radhey Suites, Tellapur Main Road, Hyderabad - 502032",
      phone: "+91 78424 66668",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9!2d78.28!3d17.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI3JzAwLjAiTiA3OMKwMTYnNDguMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dantam+Dental+Clinic+Tellapur+Hyderabad&daddr=Near+My+Home+Sayuk+%26+Radhey+Suites,+Tellapur+Main+Road,+Hyderabad+-+502032"
    },
    kokapet: {
      title: "Dantam Dental Clinic - Kokapet",
      address: "Golden Mile Road, Opp. Vertex Giganya, Kokapet, Hyderabad - 500075",
      phone: "+91 78424 66668",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.1!2d78.33!3d17.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI4JzM2LjAiTiA3OMKwMTknNDguMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dantam+Dental+Clinic+Kokapet+Hyderabad&daddr=Golden+Mile+Road,+Opp.+Vertex+Giganya,+Kokapet,+Hyderabad+-+500075"
    },
    chintal: {
      title: "Dantam Dental Clinic - Chintal",
      address: "Main Road, Near IDPL Colony Entrance, Chintal, Quthbullapur, Hyderabad - 500054",
      phone: "+91 78424 66668",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.8!2d78.46!3d17.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMwJzM2LjAiTiA3OMKwMjcnMzYuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dantam+Dental+Clinic+Chintal+Hyderabad&daddr=Main+Road,+Near+IDPL+Colony+Entrance,+Chintal,+Quthbullapur,+Hyderabad+-+500054"
    },
    shapur: {
      title: "Dantam Dental Clinic - Shapur Nagar",
      address: "Near X Roads, Main Commercial Complex, Shapur Nagar, Jeedimetla, Hyderabad - 500055",
      phone: "+91 78424 66668",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.6!2d78.44!3d17.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMxJzEyLjAiTiA3OMKwMjYnMjQuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Dantam+Dental+Clinic+Shapur+Nagar+Hyderabad&daddr=Near+X+Roads,+Main+Commercial+Complex,+Shapur+Nagar,+Jeedimetla,+Hyderabad+-+500055"
    }
  };

  locationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const branchKey = tab.getAttribute('data-branch');
      locationTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (locationData[branchKey]) {
        const data = locationData[branchKey];
        if (locationTitle) locationTitle.textContent = data.title;
        if (locationAddress) locationAddress.textContent = data.address;
        if (locationPhone) locationPhone.textContent = data.phone;
        if (locationMap) locationMap.src = data.mapSrc;
        if (locationDirectionsBtn) locationDirectionsBtn.href = data.directionsUrl;
      }
    });
  });

  /* -------------------------------------------------------------------------- */
  /* 6. MOBILE MENU TOGGLE                                                      */
  /* -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      if (isOpen) {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '80px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = '#FFFFFF';
        navMenu.style.padding = '24px';
        navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /* 7. DYNAMIC INFORMATION DETAIL MODAL LOGIC                                  */
  /* -------------------------------------------------------------------------- */
  const infoData = {
    "tooth pain": {
      tag: "Symptom Insight",
      title: "Wisdom Tooth Pain Relief",
      description: "Throbbing, sharp, or persistent pain around the back of your jaw is often caused by an erupting or impacted wisdom tooth exerting pressure on surrounding gums, jawbone, or sensory nerves.",
      points: [
        "Often intensifies during chewing, biting, or lying flat at night.",
        "Can radiate along the jawbone, ear, temple, or neck muscles.",
        "Early digital evaluation prevents nerve irritation and neighboring molar cavities.",
        "Managed with targeted local anesthesia and gentle extraction."
      ],
      tip: "If pain lasts more than 48 hours or disrupts sleep, schedule an OPG scan to evaluate root position."
    },
    "swollen gums": {
      tag: "Symptom Insight",
      title: "Swollen Gums & Pericoronitis",
      description: "When a wisdom tooth partially emerges through the gumline, it creates a flap of gum tissue (operculum) where bacteria and food debris easily collect, triggering localized inflammation known as pericoronitis.",
      points: [
        "Causes redness, tenderness, and localized swelling behind second molars.",
        "Can lead to mild pus discharge or difficulty swallowing if left unaddressed.",
        "Requires antiseptic flushing and professional clinical assessment.",
        "Definitive surgical removal or gum contouring resolves the infection trap permanently."
      ],
      tip: "Rinse gently with warm salt water 3-4 times daily while awaiting your clinical appointment."
    },
    "jaw discomfort": {
      tag: "Symptom Insight",
      title: "Jaw Discomfort & Stiffness (Trismus)",
      description: "Tightness, aching, or restricted mouth opening (trismus) occurs when impacted wisdom teeth trigger inflammation in the masseter muscle and jaw joint (TMJ) region.",
      points: [
        "Makes opening your mouth, chewing, or yawning uncomfortable.",
        "Often accompanied by muscle tension near the ear and temple.",
        "Indicates deep impaction pressing against the ramus of the mandible.",
        "Relieved through gentle surgical extraction and muscle-relaxing aftercare."
      ],
      tip: "Apply a warm compress to the outer jaw to ease muscle tightness before your evaluation."
    },
    "impacted tooth": {
      tag: "Symptom Insight",
      title: "Impacted Wisdom Tooth Management",
      description: "An impacted wisdom tooth lacks space in the jaw to erupt properly. It may remain buried beneath bone (full bony impaction) or grow sideways against second molars (mesioangular impaction).",
      points: [
        "Mesioangular impactions press directly against healthy adjacent molars.",
        "Horizontal impactions lie sideways, exerting pressure on jaw structures.",
        "Full bony impactions require specialized 3D CBCT nerve mapping.",
        "Performed gently by experienced Oral & Maxillofacial Surgeons."
      ],
      tip: "3D CBCT imaging provides sub-millimeter visualization of root proximity to the inferior alveolar nerve."
    },
    "food trapping": {
      tag: "Symptom Insight",
      title: "Food Trapping & Second Molar Protection",
      description: "Partially erupted wisdom teeth create narrow pockets where toothbrush bristles cannot reach, allowing food debris to collect and ferment.",
      points: [
        "Leads to persistent bad breath (halitosis) and localized gum bleeding.",
        "Fermenting food debris damages enamel on the adjacent healthy second molar.",
        "Standard flossing is often insufficient due to difficult angulation.",
        "Timely extraction protects your permanent functional second molars."
      ],
      tip: "Extracting a problematic wisdom tooth preserves your healthy adjacent second molar."
    },
    "repeated infections": {
      tag: "Symptom Insight",
      title: "Repeated Pericoronal Infections",
      description: "Recurring bacterial infection around wisdom teeth damages localized gum and bone tissue, leading to recurrent pain episodes, facial swelling, and discomfort.",
      points: [
        "Antibiotics offer temporary relief but cannot fix poor tooth orientation.",
        "Recurrent infection risks localized bone loss around adjacent teeth.",
        "Clinical evaluation determines whether surgical clearance is necessary.",
        "Permanent resolution is achieved through definitive wisdom tooth removal."
      ],
      tip: "Antibiotics treat the infection, not the physical cause. Surgical removal provides permanent relief."
    },
    "2d opg": {
      tag: "Diagnostic Tech",
      title: "2D OPG Panoramic Digital Scan",
      description: "An Orthopantomogram (OPG) is a full-mouth panoramic digital X-ray capturing all 32 teeth, jawbones, sinuses, and joint structures in a single image.",
      points: [
        "Shows all 4 wisdom teeth simultaneously relative to jaw anatomy.",
        "Identifies root curvature, impaction angle, and bone density.",
        "Completed in under 30 seconds with minimal radiation exposure.",
        "Essential diagnostic baseline performed directly inside Dantam Clinics."
      ],
      tip: "OPG imaging provides your surgeon with a complete anatomical roadmap before treatment."
    },
    "3d cbct": {
      tag: "Diagnostic Tech",
      title: "3D CBCT Cone Beam Imaging",
      description: "3D Cone Beam Computed Tomography (CBCT) generates ultra-precise 3D volumetric images of teeth, roots, jawbone, and nerve pathways.",
      points: [
        "Maps exact 3D distance between tooth roots and the inferior alveolar nerve.",
        "Essential for complex, deeply buried, or hooked-root impactions.",
        "Enables surgeons to plan surgical sectioning paths with total precision.",
        "Prevents post-surgical nerve irritation or numbness."
      ],
      tip: "Recommended when 2D scans show root proximity to major jaw sensory nerves."
    },
    "expert-led care": {
      tag: "Dantam Advantage",
      title: "Expert-Led Oral Surgical Care",
      description: "At Dantam Clinics, complex extractions are performed by experienced dental professionals and Oral & Maxillofacial Surgeons specializing in jaw surgery and nerve preservation.",
      points: [
        "Specialist care for difficult impactions and complex root anatomy.",
        "Gentle surgical techniques designed to minimize post-op swelling.",
        "Comprehensive safety protocols tailored to your health background.",
        "Empathetic, zero-stress clinical communication throughout."
      ],
      tip: "Having an experienced surgeon handle your extraction ensures a faster, smoother recovery."
    },
    "expert oral surgeon consultation": {
      tag: "Dantam Advantage",
      title: "Expert-Led Oral Surgical Care",
      description: "At Dantam Clinics, complex extractions are performed by experienced dental professionals and Oral & Maxillofacial Surgeons specializing in jaw surgery and nerve preservation.",
      points: [
        "Specialist care for difficult impactions and complex root anatomy.",
        "Gentle surgical techniques designed to minimize post-op swelling.",
        "Comprehensive safety protocols tailored to your health background.",
        "Empathetic, zero-stress clinical communication throughout."
      ],
      tip: "Having an experienced surgeon handle your extraction ensures a faster, smoother recovery."
    },
    "monitor": {
      tag: "Clinical Decision",
      title: "Phase 01 — Clinical Monitoring",
      description: "If your wisdom teeth are fully erupted, functional, bite properly, and can be maintained with normal flossing and brushing, extraction is unnecessary.",
      points: [
        "Includes regular 6-month clinical checkups and periodic digital X-rays.",
        "Focuses on maintaining optimal hygiene around third molars.",
        "Protects healthy teeth without unnecessary surgical intervention.",
        "Transitioned to active treatment only if symptoms or impaction develop."
      ],
      tip: "Dantam practices evidence-based dentistry—we only recommend extraction when clinically beneficial."
    },
    "evaluate": {
      tag: "Clinical Decision",
      title: "Phase 02 — Clinical Evaluation",
      description: "Detailed diagnostic evaluation using 2D OPG or 3D CBCT scans to analyze tooth position, root development, and proximity to neighboring structures.",
      points: [
        "Identifies early signs of impaction, bone loss, or molar crowding.",
        "Measures angle of eruption and distance from sensory nerves.",
        "Determines whether simple extraction or surgical removal is appropriate.",
        "Provides clear cost estimates and procedure timeline."
      ],
      tip: "Evaluation gives you complete clarity so you can make informed choices without pressure."
    },
    "treat if necessary": {
      tag: "Clinical Decision",
      title: "Phase 03 — Targeted Treatment",
      description: "Proactive extraction performed when wisdom teeth cause pain, recurrent infection, impaction, or risk to adjacent molars.",
      points: [
        "Eliminates chronic pain and pericoronitis permanently.",
        "Prevents root resorption and cavities on adjacent second molars.",
        "Performed comfortably under targeted local anesthesia.",
        "Accompanied by structured aftercare and rapid recovery protocols."
      ],
      tip: "Treating problematic wisdom teeth early prevents secondary emergency complications."
    },
    "consultation": {
      tag: "Patient Journey",
      title: "Step 01 — Personal Consultation",
      description: "Your journey starts with a friendly, comprehensive conversation in a private consultation room to discuss your symptoms, dental history, and comfort preferences.",
      points: [
        "Discuss your specific symptoms, pain triggers, and anxieties.",
        "Review your oral health and past medical history.",
        "Understand your scheduling and recovery timelines.",
        "Experience calm, compassionate patient communication."
      ],
      tip: "We listen carefully to all your concerns before performing any physical examination."
    },
    "examination": {
      tag: "Patient Journey",
      title: "Step 02 — Clinical Examination",
      description: "A thorough visual evaluation of your wisdom teeth, surrounding gum pockets, biting alignment, and jaw joint movement by experienced dental professionals.",
      points: [
        "Evaluates gum pocket depth and signs of inflammation.",
        "Assesses tooth accessibility, stability, and molar relationship.",
        "Reviews medical background and anesthetic suitability.",
        "Forms the diagnostic foundation for your customized care plan."
      ],
      tip: "Your doctor will explain every clinical finding clearly using digital display monitors."
    },
    "imaging": {
      tag: "Patient Journey",
      title: "Step 03 — Diagnostic Imaging",
      description: "In-house 2D OPG panoramic or 3D CBCT scans performed to map root curvature, jawbone density, and nerve pathways before surgical planning.",
      points: [
        "Identifies exact root shapes and hidden impactions.",
        "Maps safety distances to jaw sensory nerves.",
        "Quick, pain-free digital scan completed in seconds.",
        "Ensures complete anatomical precision before any procedure."
      ],
      tip: "High-resolution digital scans eliminate surgical uncertainty."
    },
    "treatment planning": {
      tag: "Patient Journey",
      title: "Step 04 — Treatment Planning",
      description: "Your dentist explains whether monitoring, simple extraction, or surgical removal is appropriate, detailing steps, costs, and recovery expectations.",
      points: [
        "Transparent discussion of procedure complexity.",
        "Clear estimate of treatment costs without surprise fees.",
        "Anesthesia and pain management planning.",
        "Answers all your questions before scheduling."
      ],
      tip: "You receive complete written treatment guidance before proceeding."
    },
    "procedure": {
      tag: "Patient Journey",
      title: "Step 05 — Clinical Procedure",
      description: "Performed in a sterile clinical suite under gentle local anesthesia to ensure complete numbness and total peace of mind.",
      points: [
        "Targeted local anesthesia renders the entire area pain-free.",
        "Gentle, precise extraction techniques used by experienced doctors.",
        "Constant monitoring of your comfort level throughout.",
        "Procedure typically takes 20 to 45 minutes."
      ],
      tip: "You will feel mild pressure during the procedure, but zero sharp pain."
    },
    "recovery": {
      tag: "Patient Journey",
      title: "Step 06 — Guided Recovery",
      description: "Receive personalized aftercare instructions, prescription medication, soft-diet guidance, and direct access to our Hyderabad clinical helpline.",
      points: [
        "Clear guidelines for gauze placement, ice packs, and soft diet.",
        "Prescription pain medication and antiseptic mouthwash.",
        "Direct phone and WhatsApp helpline for recovery questions.",
        "Follow-up visit for suture check and smooth healing verification."
      ],
      tip: "Following your post-op instructions ensures a quick, comfortable recovery within a few days."
    },
    // RECOVERY CARDS
    "first 24 hours": {
      tag: "Aftercare Phase",
      title: "First 24 Hours Post-Procedure",
      description: "The initial 24 hours are critical for blood clot formation in the extraction socket. Protecting this blood clot prevents dry socket and promotes rapid tissue recovery.",
      points: [
        "Keep initial cotton gauze firmly in place for 45-60 minutes.",
        "Avoid spitting, vigorous gargling, or drinking through straws.",
        "Rest with your head elevated on 2 pillows to minimize oozing.",
        "Consume cool, soft foods like yogurt, ice cream, or smooth curd rice."
      ],
      tip: "Do not disturb the surgical site with your tongue, fingers, or toothbrush."
    },
    "next few days": {
      tag: "Aftercare Phase",
      title: "Days 2-3 Recovery Care",
      description: "Mild swelling and jaw muscle tightness usually peak between 24 and 48 hours post-procedure before steadily diminishing.",
      points: [
        "Apply cold ice packs to the outer cheek in 15-minute intervals.",
        "Take prescribed pain relievers and anti-inflammatory medications on schedule.",
        "Stick to soft, non-spicy foods such as mashed potatoes, smoothies, and soups.",
        "Begin gentle warm salt-water mouth rinses 24 hours after surgery."
      ],
      tip: "Taking prescribed medications on schedule prevents pain spikes before they start."
    },
    "during recovery": {
      tag: "Aftercare Phase",
      title: "Days 4-7 Recovery Progression",
      description: "Swelling subsides significantly, gum tissue begins closing over the extraction socket, and jaw mobility returns to normal.",
      points: [
        "Continue warm salt-water rinses after meals to keep the area clean.",
        "Gradually reintroduce soft solid foods as chewing comfort improves.",
        "Brush teeth carefully, avoiding aggressive scrubbing near the site.",
        "Refrain from smoking or chewing tobacco as it delays healing."
      ],
      tip: "Contact our helpline (+91 78424 66668) if pain increases after day 3."
    },
    "clinical support": {
      tag: "Aftercare Phase",
      title: "Follow-Up & Clinical Support",
      description: "Dantam Clinics provides dedicated follow-up visits, suture checking or removal, and direct helpline support across all Hyderabad branches.",
      points: [
        "Routine follow-up visit scheduled 5-7 days post-procedure.",
        "Quick, pain-free removal of non-resorbable stitches if placed.",
        "Complete evaluation of gum tissue closure and socket healing.",
        "Direct phone and WhatsApp access to our clinical team."
      ],
      tip: "Our helpline (+91 78424 66668) is open daily for post-treatment assistance."
    },
    // RISKS & SAFETY CARDS
    "swelling & tenderness": {
      tag: "Safety & Transparency",
      title: "Understanding Swelling & Tenderness",
      description: "Post-operative tissue swelling is a normal immune response as jaw tissues initiate healing following tooth extraction.",
      points: [
        "Peaks around 48 hours after surgery before steadily subsiding.",
        "Effectively managed using cold ice packs during the first 24-48 hours.",
        "Controlled with prescribed anti-inflammatory medications.",
        "Varies based on procedure complexity and individual tissue response."
      ],
      tip: "Using ice packs during the first 24 hours significantly reduces peak swelling."
    },
    "minor bleeding": {
      tag: "Safety & Transparency",
      title: "Managing Post-Op Oozing & Bleeding",
      description: "Slight pink saliva or minor oozing from the extraction site is normal for the first 12 to 24 hours following surgery.",
      points: [
        "Controlled by biting firmly on sterile cotton gauze for 45-60 minutes.",
        "Avoid spitting, suction, or aggressive mouth rinsing.",
        "Refrain from hot drinks, alcohol, and heavy exercise on day 1.",
        "Dantam provides extra sterile gauze packs in your aftercare kit."
      ],
      tip: "If oozing persists, bite gently on a moistened tea bag wrapped in gauze—tannins assist clotting."
    },
    "dry socket": {
      tag: "Safety & Transparency",
      title: "Dry Socket (Alveolar Osteitis) Prevention",
      description: "Dry socket occurs if the protective blood clot dislodges prematurely from the socket, exposing underlying bone to air and fluids.",
      points: [
        "Causes throbbing pain 3-5 days post-surgery radiating toward the ear.",
        "Occurs in under 3-5% of cases and is easily treated at our clinic.",
        "Prevented by avoiding smoking, spitting, and drinking through straws.",
        "Treated rapidly at Dantam with soothing medicated dressing."
      ],
      tip: "Avoiding straws and smoking for 7 days reduces dry socket risk by over 90%."
    },
    "temporary stiffness": {
      tag: "Safety & Transparency",
      title: "Temporary Jaw Stiffness (Trismus)",
      description: "Temporary limitation in opening your mouth wide (trismus) can occur due to masseter jaw muscle tightness following surgical removal.",
      points: [
        "Resolves naturally within 3 to 7 days as inflammation subsides.",
        "Comforted by warm compresses applied to the cheek on days 3-5.",
        "Gentle jaw opening exercises help restore full muscle flexibility.",
        "Pre-operative gentle surgical technique minimizes muscle strain."
      ],
      tip: "Gentle jaw stretches after day 3 accelerate full muscle mobility."
    },
    // COMFORT CARDS
    "before treatment": {
      tag: "Comfort Protocol",
      title: "Pre-Treatment Comfort & Anesthesia Planning",
      description: "We review your anxiety levels, health history, and 3D digital scans to plan optimal local anesthesia and relaxation protocols.",
      points: [
        "Comprehensive health review and anesthetic planning.",
        "Detailed explanation of procedure steps to ease anxiety.",
        "Gentle topical numbing gel applied before local anesthesia injection.",
        "Calm, soothing private consultation atmosphere."
      ],
      tip: "Feel free to share any dental fears—we tailor our approach to your comfort."
    },
    "during treatment": {
      tag: "Comfort Protocol",
      title: "During-Treatment Zero-Pain Clinical Care",
      description: "Targeted local anesthesia completely numbs the jaw area, ensuring you feel zero sharp pain during the extraction.",
      points: [
        "Complete local numbness verified before any procedure begins.",
        "Gentle surgical technique performed by experienced oral surgeons.",
        "Continuous monitoring of your comfort level throughout.",
        "Relaxing modern dental suite environment."
      ],
      tip: "You will feel mild pressure, but zero pain during the procedure."
    },
    "after treatment": {
      tag: "Comfort Protocol",
      title: "Post-Treatment Pain Management Guidance",
      description: "Personalized prescription medications, clear home aftercare guidelines, and direct clinical helpline access ensure smooth healing.",
      points: [
        "Targeted pain relief and antibiotic prescriptions.",
        "Clear step-by-step home aftercare instruction sheet.",
        "Direct phone and WhatsApp helpline for recovery questions.",
        "Scheduled follow-up visit to verify tissue closure."
      ],
      tip: "Our team is always just a phone call away throughout your recovery."
    }
  };

  const clickableElements = document.querySelectorAll('.symptom-card, .decision-card, .tech-card, .feature-card, .journey-step, .procedure-card, .factor-pill, .trust-bar-item, .recovery-card, .risk-item, .comparison-card, .cost-factor-item, .experience-item, .comfort-card');
  const infoModal = document.getElementById('info-modal');
  const infoModalTag = document.getElementById('infoModalTag');
  const infoModalTitle = document.getElementById('infoModalTitle');
  const infoModalDesc = document.getElementById('infoModalDesc');
  const infoModalPoints = document.getElementById('infoModalPoints');
  const infoModalTip = document.getElementById('infoModalTip');
  const infoModalBookBtn = document.getElementById('infoModalBookBtn');

  clickableElements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      // Don't trigger if user clicked an explicit button inside the card
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

      // Extract title & text from card
      const titleElem = elem.querySelector('h3, h4, h5, .symptom-title, .recovery-tag, .risk-item h4, span');
      const descElem = elem.querySelector('p, .symptom-desc, .comparison-header p');

      const rawText = titleElem ? titleElem.textContent.trim() : elem.textContent.trim();
      const cardDescText = descElem ? descElem.textContent.trim() : '';

      const cleanKey = rawText.toLowerCase().replace(/^(step \d+ — |phase \d+ — |0\d — |day \d — |days \d-\d — |day \d |days \d-\d )/i, '').trim();

      // Find matching item in dictionary or generate fallback
      let itemData = infoData[cleanKey];

      if (!itemData) {
        // Partial matching search
        for (let key in infoData) {
          if (cleanKey.includes(key) || key.includes(cleanKey)) {
            itemData = infoData[key];
            break;
          }
        }
      }

      if (!itemData) {
        // Dynamic smart fallback structure built from card text
        itemData = {
          tag: "Clinical Guidance",
          title: rawText,
          description: cardDescText || `Comprehensive clinical guidance regarding ${rawText} at Dantam Dental Clinics Hyderabad. Our oral surgery team prioritizes patient safety, comfort, and precision.`,
          points: [
            `Evaluated directly by experienced dental professionals and surgeons.`,
            `Supported by in-house 2D OPG or 3D CBCT diagnostic imaging.`,
            `Personalized care protocol designed around your health profile.`,
            `Direct helpline support across Gachibowli, Kondapur, Tellapur, Kokapet, Chintal & Shapur Nagar.`
          ],
          tip: `Consult our Dantam oral surgeons for personalized advice regarding ${rawText}.`
        };
      }

      // Populate Modal Content
      if (infoModalTag) infoModalTag.textContent = itemData.tag;
      if (infoModalTitle) infoModalTitle.textContent = itemData.title;
      if (infoModalDesc) infoModalDesc.textContent = itemData.description;
      if (infoModalTip) infoModalTip.textContent = itemData.tip;

      if (infoModalPoints) {
        infoModalPoints.innerHTML = itemData.points.map(pt => `
          <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.925rem; color: #1C2B2A;">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="color: #0A7476; flex-shrink: 0; margin-top: 2px;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>${pt}</span>
          </li>
        `).join('');
      }

      if (infoModalBookBtn) {
        infoModalBookBtn.onclick = () => {
          infoModal.classList.remove('active');
          document.body.style.overflow = 'auto';
          const appointmentModal = document.getElementById('appointment-modal');
          if (appointmentModal) {
            appointmentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            const concernSelect = appointmentModal.querySelector('#mainConcern');
            if (concernSelect) {
              for (let i = 0; i < concernSelect.options.length; i++) {
                if (concernSelect.options[i].value.toLowerCase().includes(cleanKey.toLowerCase()) ||
                    cleanKey.toLowerCase().includes(concernSelect.options[i].value.toLowerCase())) {
                  concernSelect.selectedIndex = i;
                  break;
                }
              }
            }
          }
        };
      }

      // Open Modal
      if (infoModal) {
        infoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

});


