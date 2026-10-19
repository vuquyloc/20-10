
import * as THREE from 'https://esm.sh/three@0.180.0';
import { GLTFLoader } from 'https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://esm.sh/three@0.180.0/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'https://esm.sh/three@0.180.0/examples/jsm/controls/OrbitControls.js';

/* =========================================
   BÓ HOA TULIP 3D
   Giữ nguyên mô hình và đường dẫn ban đầu
========================================= */

const container = document.getElementById('bouquet3d');

if (container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#fff0f6');

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / Math.max(container.clientHeight, 1),
    0.1,
    100
  );

  camera.position.set(0, 1.2, 5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  container.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xe8a9c5, 2));

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(3, 5, 5);
  scene.add(light);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.autoRotate = false;
  controls.enablePan = false;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'
  );

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    './assets/bo-hoa-tulip-moi.glb',
    (gltf) => {
      const bouquet = gltf.scene;
      scene.add(bouquet);

      const box = new THREE.Box3().setFromObject(bouquet);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      bouquet.position.sub(center);

      const maxSize = Math.max(size.x, size.y, size.z);

      if (maxSize > 0) {
        bouquet.scale.setScalar(2.5 / maxSize);
      }

      bouquet.position.y = 0;

      camera.position.set(0, 0, 4.5);
      controls.target.set(0, 0, 0);
      controls.update();

      const modelStatus = document.getElementById('modelStatus');
      if (modelStatus) modelStatus.textContent = '';
    },
    undefined,
    (error) => {
      console.error('Không tải được mô hình hoa:', error);

      const modelStatus = document.getElementById('modelStatus');
      if (modelStatus) {
        modelStatus.textContent =
          'Chưa tải được bó hoa 3D. Hãy kiểm tra file trong thư mục assets.';
      }
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/* =========================================
   CHUYỂN MÀN HÌNH CHÀO SANG ALBUM
========================================= */

const startButton = document.getElementById('startBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const albumScreen = document.getElementById('albumScreen');

if (startButton && welcomeScreen && albumScreen) {
  albumScreen.hidden = true;

  startButton.addEventListener('click', () => {
    if (startButton.disabled) return;

    startButton.disabled = true;
    welcomeScreen.classList.add('screen-leaving');

    window.setTimeout(() => {
      welcomeScreen.hidden = true;
      albumScreen.hidden = false;

      window.scrollTo({ top: 0, behavior: 'instant' });

      startButton.disabled = false;
    }, 450);
  });
}

/* =========================================
   DỮ LIỆU 15 TRANG NHẬT KÍ
   Có thể sửa tiêu đề và lời nhắn tại đây
========================================= */

const memories = [
  {
    title: 'Một ngày đáng nhớ',
    message: 'Có những ngày tưởng như bình thường, nhưng sau này lại trở thành kỉ niệm mà chúng mình luôn muốn nhớ về.'
  },
  {
    title: 'Những người bạn thân thương',
    message: 'Cảm ơn vì đã cùng nhau cười, cùng nhau chia sẻ và làm cho những ngày đến lớp trở nên đáng yêu hơn.'
  },
  {
    title: 'Thanh xuân có cậu',
    message: 'Thanh xuân không chỉ có những bài học, mà còn có những người khiến mỗi ngày đều trở nên đặc biệt.'
  },
  {
    title: 'Ngày chúng mình gặp nhau',
    message: 'Từ những người xa lạ, chúng mình dần trở thành một phần trong câu chuyện tuổi trẻ của nhau.'
  },
  {
    title: 'Những nụ cười',
    message: 'Mong rằng sau này khi nhìn lại, chúng mình vẫn có thể mỉm cười vì đã từng có những tháng ngày vui vẻ như thế.'
  },
  {
    title: 'Một chút tinh nghịch',
    message: 'Những trò đùa ngốc nghếch đôi khi lại là điều khiến chúng mình nhớ nhất khi thời gian trôi qua.'
  },
  {
    title: 'Chuyện ở lớp mình',
    message: 'Mỗi ngày ở lớp đều có một câu chuyện. Có chuyện khiến ta cười, có chuyện khiến ta nhớ mãi không quên.'
  },
  {
    title: 'Khoảnh khắc bất chợt',
    message: 'Không phải lúc nào máy ảnh cũng ghi lại được tất cả. Nhưng mong rằng trái tim chúng mình sẽ giữ lại những điều đẹp nhất.'
  },
  {
    title: 'Ngày vui của chúng mình',
    message: 'Chúc cho những niềm vui hôm nay sẽ trở thành một phần kí ức thật dịu dàng trong những năm tháng sau này.'
  },
  {
    title: 'Một tấm hình, nhiều câu chuyện',
    message: 'Đằng sau mỗi bức ảnh là những lời chưa nói, những tiếng cười và cả những điều chỉ chúng mình mới hiểu.'
  },
  {
    title: 'Những điều giản dị',
    message: 'Đôi khi hạnh phúc chỉ là được gặp nhau, được hỏi han và cùng trải qua một ngày bình thường.'
  },
  {
    title: 'Ngày tháng không quên',
    message: 'Thời gian sẽ đưa chúng mình đến nhiều nơi khác nhau. Mong rằng những ngày tháng này vẫn luôn có một chỗ nhỏ trong tim.'
  },
  {
    title: 'Cùng nhau lớn lên',
    message: 'Mong mỗi người đều có thể trưởng thành theo cách mình mong muốn, nhưng vẫn nhớ rằng chúng ta từng có chung một thời thanh xuân.'
  },
  {
    title: 'Gửi những ngày tươi đẹp',
    message: 'Nếu có thể gửi một lời nhắn đến tương lai, mình mong chúng ta sẽ luôn bình an, hạnh phúc và không quên những người bạn hôm nay.'
  },
  {
    title: 'Còn mãi trong tim',
    message: 'Album này có thể khép lại, nhưng những kỉ niệm đẹp sẽ luôn là một phần của câu chuyện 10Aspire.'
  }
];

/* =========================================
   HIỂN THỊ ẢNH DỰ PHÒNG KHI CHƯA CÓ ẢNH
========================================= */

document.querySelectorAll('.memory-card').forEach((card) => {
  const image = card.querySelector('img');
  const placeholder = card.querySelector('.photo-placeholder');

  if (!image || !placeholder) return;

  function updateImageState() {
    const imageLoaded =
      image.complete &&
      image.naturalWidth > 0;

    placeholder.hidden = imageLoaded;
  }

  image.addEventListener('load', updateImageState);
  image.addEventListener('error', updateImageState);

  updateImageState();
});

/* =========================================
   MỞ ẢNH LỚN VÀ ĐỌC LỜI NHẮN
========================================= */

const photoModal = document.getElementById('photoModal');
const modalPhoto = document.getElementById('modalPhoto');
const modalNumber = document.getElementById('modalNumber');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalCounter = document.getElementById('modalCounter');

const closeModalBtn = document.getElementById('closeModalBtn');
const prevPhotoBtn = document.getElementById('prevPhotoBtn');
const nextPhotoBtn = document.getElementById('nextPhotoBtn');

let currentPhotoIndex = 0;
let lastFocusedCard = null;

function formatNumber(number) {
  return String(number).padStart(2, '0');
}

function showPhoto(index) {
  if (!memories.length) return;

  currentPhotoIndex =
    (index + memories.length) % memories.length;

  const memory = memories[currentPhotoIndex];
  const card = document.querySelector(
    `.memory-card[data-photo="${currentPhotoIndex}"]`
  );
  const image = card?.querySelector('img');

  modalNumber.textContent =
    `MEMORY NO. ${formatNumber(currentPhotoIndex + 1)}`;

  modalTitle.textContent = memory.title;
  modalMessage.textContent = memory.message;

  modalCounter.textContent =
    `${formatNumber(currentPhotoIndex + 1)} / ${formatNumber(memories.length)}`;

  if (image) {
    modalPhoto.src = image.getAttribute('src');
    modalPhoto.alt = image.alt || memory.title;
  }

  photoModal.hidden = false;
  document.body.style.overflow = 'hidden';
  closeModalBtn.focus();
}

function closePhotoModal() {
  photoModal.hidden = true;
  document.body.style.overflow = '';

  if (lastFocusedCard && document.contains(lastFocusedCard)) {
    lastFocusedCard.focus();
  }
}

document.querySelectorAll('.memory-card').forEach((card) => {
  card.addEventListener('click', () => {
    const index = Number(card.dataset.photo);

    if (!Number.isInteger(index) || index < 0 || index >= memories.length) {
      return;
    }

    lastFocusedCard = card;
    showPhoto(index);
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closePhotoModal);
}

if (prevPhotoBtn) {
  prevPhotoBtn.addEventListener('click', () => {
    showPhoto(currentPhotoIndex - 1);
  });
}

if (nextPhotoBtn) {
  nextPhotoBtn.addEventListener('click', () => {
    showPhoto(currentPhotoIndex + 1);
  });
}

if (photoModal) {
  photoModal.addEventListener('click', (event) => {
    if (event.target === photoModal) {
      closePhotoModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (photoModal.hidden) return;

  if (event.key === 'Escape') {
    closePhotoModal();
  }

  if (event.key === 'ArrowLeft') {
    showPhoto(currentPhotoIndex - 1);
  }

  if (event.key === 'ArrowRight') {
    showPhoto(currentPhotoIndex + 1);
  }
});

/* =========================================
   QUAY LẠI MÀN HÌNH CHÀO
========================================= */

const backHomeBtn = document.getElementById('backHomeBtn');

if (backHomeBtn && welcomeScreen && albumScreen) {
  backHomeBtn.addEventListener('click', () => {
    albumScreen.hidden = true;
    welcomeScreen.hidden = false;
    welcomeScreen.classList.remove('screen-leaving');

    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

/* =========================================
   NHẠC NỀN ÊM DỊU
   Tạo giai điệu bằng Web Audio API
   Không cần tải file nhạc bên ngoài
========================================= */

const musicButton = document.getElementById('musicButton');

let audioContext = null;
let masterGain = null;
let musicInterval = null;
let musicIsPlaying = false;
let melodyIndex = 0;

const melody = [
  [523.25, 659.25, 783.99],
  [493.88, 587.33, 739.99],
  [440.00, 523.25, 659.25],
  [392.00, 493.88, 587.33],
  [440.00, 554.37, 659.25],
  [392.00, 493.88, 587.33],
  [349.23, 440.00, 523.25],
  [392.00, 493.88, 587.33]
];

function playSoftNote(frequency, startTime, duration, volume = 0.22) {
  if (!audioContext || !masterGain) return;

  const oscillator = audioContext.createOscillator();
  const noteGain = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, startTime);

  noteGain.gain.setValueAtTime(0.0001, startTime);
  noteGain.gain.exponentialRampToValueAtTime(
    volume,
    startTime + 0.12
  );
  noteGain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + duration
  );

  oscillator.connect(noteGain);
  noteGain.connect(masterGain);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
}

function playMelodyPhrase() {
  if (!musicIsPlaying || !audioContext) return;

  const startTime = audioContext.currentTime + 0.05;
  const chord = melody[melodyIndex];

  chord.forEach((frequency, index) => {
    playSoftNote(
      frequency,
      startTime + index * 0.11,
      1.65,
      0.16
    );
  });

  // Nốt cao nhẹ tạo cảm giác trong trẻo
  playSoftNote(
    chord[0] * 2,
    startTime + 0.32,
    1.2,
    0.07
  );

  melodyIndex = (melodyIndex + 1) % melody.length;
}

async function startMusic() {
  try {
    if (!audioContext) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        throw new Error('Trình duyệt không hỗ trợ Web Audio API.');
      }

      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();

      masterGain.gain.value = 0.0001;
      masterGain.connect(audioContext.destination);
    }

    await audioContext.resume();

    musicIsPlaying = true;

    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
    masterGain.gain.setTargetAtTime(
      0.32,
      audioContext.currentTime,
      0.25
    );

    musicButton.setAttribute('aria-pressed', 'true');
    musicButton.setAttribute('aria-label', 'Tắt nhạc nền');

    playMelodyPhrase();

    if (musicInterval) {
      clearInterval(musicInterval);
    }

    musicInterval = window.setInterval(playMelodyPhrase, 2200);
  } catch (error) {
    console.error('Không thể phát nhạc:', error);
    musicIsPlaying = false;

    musicButton.setAttribute('aria-pressed', 'false');
    musicButton.setAttribute('aria-label', 'Bật nhạc nền');
  }
}

function stopMusic() {
  musicIsPlaying = false;

  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }

  if (audioContext && masterGain) {
    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
    masterGain.gain.setTargetAtTime(
      0.0001,
      audioContext.currentTime,
      0.08
    );
  }

  musicButton.setAttribute('aria-pressed', 'false');
  musicButton.setAttribute('aria-label', 'Bật nhạc nền');
}

if (musicButton) {
  musicButton.addEventListener('click', () => {
    if (musicIsPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  });
}
