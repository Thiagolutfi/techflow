document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================
  // ELEMENTOS
  // ==========================================================
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const openSidebarBtn = document.getElementById("openSidebarBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");

  const userMenuButton = document.getElementById("userMenuButton");
  const userDropdown = document.getElementById("userDropdown");

  const themeSelect = document.getElementById("themeSelect");

  const projectModal = document.getElementById("projectModal");
  const openProjectModal = document.getElementById("openProjectModal");
  const closeProjectModal = document.getElementById("closeProjectModal");
  const cancelProject = document.getElementById("cancelProject");

  const projectForm = document.getElementById("projectForm");
  const submitProject = document.getElementById("submitProject");
  const formSuccess = document.getElementById("formSuccess");
  const deadline = document.getElementById("deadline");
  const description = document.getElementById("description");
  const descriptionCounter = document.getElementById("descriptionCounter");

  const searchDesktop = document.getElementById("projectSearch");
  const searchMobile = document.getElementById("projectSearchMobile");
  const projectCards = [...document.querySelectorAll(".project-card")];
  const projectCount = document.getElementById("projectCount");
  const emptySearchState = document.getElementById("emptySearchState");

  const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // ==========================================================
  // SIDEBAR MOBILE
  // ==========================================================
  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    sidebarOverlay.classList.remove("hidden");
    openSidebarBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden");
  }

  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    sidebarOverlay.classList.add("hidden");
    openSidebarBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden");
  }

  openSidebarBtn.addEventListener("click", openSidebar);
  closeSidebarBtn.addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);

  // Se a tela voltar para desktop, remove o overlay e o bloqueio do body.
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      sidebarOverlay.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    } else {
      sidebar.classList.add("-translate-x-full");
    }
  });

  // ==========================================================
  // DROPDOWN DO USUÁRIO
  // ==========================================================
  function toggleUserDropdown() {
    const isHidden = userDropdown.classList.contains("hidden");
    userDropdown.classList.toggle("hidden");
    userMenuButton.setAttribute("aria-expanded", String(isHidden));
  }

  function closeUserDropdown() {
    userDropdown.classList.add("hidden");
    userMenuButton.setAttribute("aria-expanded", "false");
  }

  userMenuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleUserDropdown();
  });

  document.addEventListener("click", (event) => {
    if (!userDropdown.contains(event.target) && !userMenuButton.contains(event.target)) {
      closeUserDropdown();
    }
  });

  // ==========================================================
  // TEMA: LIGHT | DARK | SYSTEM
  // localStorage + preferência do sistema
  // ==========================================================
  function resolveTheme(theme) {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return systemThemeQuery.matches;
  }

  function applyTheme(theme) {
    const shouldUseDark = resolveTheme(theme);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    themeSelect.value = theme;
  }

  const savedTheme = localStorage.getItem("techflow-theme") || "system";
  applyTheme(savedTheme);

  themeSelect.addEventListener("change", () => {
    const selectedTheme = themeSelect.value;
    localStorage.setItem("techflow-theme", selectedTheme);
    applyTheme(selectedTheme);
  });

  systemThemeQuery.addEventListener("change", () => {
    const currentTheme = localStorage.getItem("techflow-theme") || "system";
    if (currentTheme === "system") {
      applyTheme("system");
    }
  });

  // ==========================================================
  // MODAL NOVO PROJETO
  // ==========================================================
  function setMinimumDeadline() {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    deadline.min = localToday;
  }

  function openModal() {
    projectModal.classList.remove("hidden");
    projectModal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    setMinimumDeadline();

    setTimeout(() => {
      document.getElementById("projectName").focus();
    }, 50);
  }

  function closeModal() {
    projectModal.classList.add("hidden");
    projectModal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }

  openProjectModal.addEventListener("click", openModal);
  closeProjectModal.addEventListener("click", closeModal);
  cancelProject.addEventListener("click", closeModal);

  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeUserDropdown();

      if (!projectModal.classList.contains("hidden")) {
        closeModal();
      }

      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    }
  });

  // ==========================================================
  // VALIDAÇÃO VISUAL DO FORMULÁRIO
  // ==========================================================
  const formFields = [...projectForm.querySelectorAll(".form-input")];

  function getFieldError(field) {
    const value = field.value.trim();

    if (!value) {
      return "Este campo é obrigatório.";
    }

    if ((field.id === "projectName" || field.id === "responsible") && value.length < 3) {
      return "Digite pelo menos 3 caracteres.";
    }

    if (field.id === "description" && value.length < 10) {
      return "A descrição deve ter pelo menos 10 caracteres.";
    }

    if (field.id === "deadline") {
      const selected = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selected < today) {
        return "O prazo não pode estar no passado.";
      }
    }

    return "";
  }

  function setFieldState(field, forceFeedback = true) {
    const error = getFieldError(field);
    const errorElement = field.parentElement.querySelector(".error-message");

    field.classList.remove("is-invalid", "is-valid");

    if (error) {
      if (forceFeedback) {
        field.classList.add("is-invalid");

        if (errorElement) {
          errorElement.textContent = error;
          errorElement.classList.remove("hidden");
        }
      }
      return false;
    }

    if (field.value.trim() && forceFeedback) {
      field.classList.add("is-valid");
    }

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }

    return true;
  }

  function isFormValid() {
    return formFields.every((field) => getFieldError(field) === "");
  }

  function updateSubmitState() {
    submitProject.disabled = !isFormValid();
  }

  formFields.forEach((field) => {
    field.addEventListener("blur", () => {
      setFieldState(field, true);
      updateSubmitState();
    });

    field.addEventListener("input", () => {
      // Enquanto o usuário digita, atualiza o estado sem mostrar erro prematuramente.
      if (field.classList.contains("is-invalid") || field.classList.contains("is-valid")) {
        setFieldState(field, true);
      }
      updateSubmitState();
    });

    field.addEventListener("change", () => {
      setFieldState(field, true);
      updateSubmitState();
    });
  });

  description.addEventListener("input", () => {
    descriptionCounter.textContent = `${description.value.length} caracteres`;
  });

  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = formFields.map((field) => setFieldState(field, true));
    const valid = results.every(Boolean);

    if (!valid) {
      formSuccess.classList.add("hidden");
      const firstInvalid = projectForm.querySelector(".is-invalid");
      firstInvalid?.focus();
      updateSubmitState();
      return;
    }

    formSuccess.classList.remove("hidden");
    submitProject.disabled = true;

    setTimeout(() => {
      projectForm.reset();
      formFields.forEach((field) => field.classList.remove("is-valid", "is-invalid"));
      projectForm.querySelectorAll(".error-message").forEach((message) => {
        message.classList.add("hidden");
        message.textContent = "";
      });

      descriptionCounter.textContent = "0 caracteres";
      formSuccess.classList.add("hidden");
      updateSubmitState();
      closeModal();
    }, 1400);
  });

  // ==========================================================
  // PESQUISA DE PROJETOS
  // ==========================================================
  function filterProjects(query) {
    const normalizedQuery = query.trim().toLowerCase();
    let visibleProjects = 0;

    projectCards.forEach((card) => {
      const searchableText = card.dataset.project.toLowerCase();
      const shouldShow = searchableText.includes(normalizedQuery);

      card.classList.toggle("hidden", !shouldShow);

      if (shouldShow) {
        visibleProjects += 1;
      }
    });

    projectCount.textContent = `${visibleProjects} ${visibleProjects === 1 ? "projeto" : "projetos"}`;
    emptySearchState.classList.toggle("hidden", visibleProjects !== 0);
  }

  function syncSearchInputs(source, target) {
    target.value = source.value;
    filterProjects(source.value);
  }

  searchDesktop.addEventListener("input", () => syncSearchInputs(searchDesktop, searchMobile));
  searchMobile.addEventListener("input", () => syncSearchInputs(searchMobile, searchDesktop));

  updateSubmitState();
});
