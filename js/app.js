// ==========================================================================
// Portfolio Application Logic — Jibin Mathew Jose (Technology Lead)
// Pure Vanilla JavaScript (0 Dependencies)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initProjectFilters();
    initSimulator();
    initResumeModal();
    initContactForm();
    initScrollHighlight();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Theme Toggle)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', storedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

/* --------------------------------------------------------------------------
   2. Enterprise Projects Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   3. AI Code Sandbox Simulator Logic
   -------------------------------------------------------------------------- */
function initSimulator() {
    const simTabs = document.querySelectorAll('.sim-tab');
    const inputText = document.getElementById('sim-input-text');
    const outputCode = document.getElementById('sim-output-code');
    const runBtn = document.getElementById('run-simulation-btn');

    let currentMode = 'bug';

    const presets = {
        bug: {
            input: `Fatal Exception: NSInvalidArgumentException\n-[__NSArrayM insertObject:atIndex:]: object cannot be nil\nStack Trace:\n0   CoreFoundation          0x180434000 __exceptionPreprocess\n1   DevAssist               0x10024a180 RepositoryImpl.swift line 42`,
            output: `// AI Diagnostic Analysis Completed in 14ms\n// Root Cause: Transient nil item passed into array state without non-null guard.\n\n@MainActor\nfinal class RepositoryImpl {\n    func safelyUpdateItems(_ newItem: Entity?) {\n        guard let validItem = newItem else {\n            logger.error("Skipped nil item insertion")\n            return\n        }\n        self.items.append(validItem)\n    }\n}`
        },
        arch: {
            input: `Requirement: Create a feature module for real-time mobile order checkout with offline support, local encryption, and MVVM-C navigation.`,
            output: `// Clean Architecture Module Specification\n// Component Hierarchy:\n\nprotocol CheckoutUseCaseProtocol: Sendable {\n    func executeCheckout(order: Order) async throws -> CheckoutResult\n}\n\nstruct CheckoutUseCase: CheckoutUseCaseProtocol {\n    private let repository: OrderRepositoryProtocol\n    \n    func executeCheckout(order: Order) async throws -> CheckoutResult {\n        return try await repository.processOrder(order)\n    }\n}`
        },
        test: {
            input: `Target Method: ViewModel.fetchUserSettings(userId: String) async -> UserSettingsState`,
            output: `// Swift 6 XCTest Suite\n\nimport XCTest\n@testable import DevAssist\n\nfinal class UserSettingsViewModelTests: XCTestCase {\n    func testFetchUserSettingsSuccess() async throws {\n        let mockRepository = MockSettingsRepository()\n        let viewModel = SettingsViewModel(repository: mockRepository)\n        \n        let result = await viewModel.fetchUserSettings(userId: "USR-99")\n        XCTAssertEqual(result.status, .active)\n    }\n}`
        }
    };

    // Set initial preset
    if (inputText && presets[currentMode]) {
        inputText.value = presets[currentMode].input;
    }

    simTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            simTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            currentMode = tab.getAttribute('data-mode');
            if (inputText && presets[currentMode]) {
                inputText.value = presets[currentMode].input;
                outputCode.textContent = "// Click 'Execute AI Simulation' to run analysis...";
            }
        });
    });

    if (runBtn) {
        runBtn.addEventListener('click', () => {
            outputCode.textContent = "// Running AI Model Analysis & Code Synthesis...";
            setTimeout(() => {
                if (presets[currentMode]) {
                    outputCode.textContent = presets[currentMode].output;
                }
            }, 600);
        });
    }
}

/* --------------------------------------------------------------------------
   4. Digital Resume Viewer Modal Logic
   -------------------------------------------------------------------------- */
function initResumeModal() {
    const modal = document.getElementById('resume-modal');
    const openBtn = document.getElementById('open-resume-btn');
    const closeBtn = document.getElementById('resume-modal-close-btn');
    const overlay = document.getElementById('resume-modal-overlay');
    const printBtn = document.getElementById('print-resume-btn');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => modal.classList.add('active'));
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (overlay && modal) {
        overlay.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

/* --------------------------------------------------------------------------
   5. Contact Form Submission Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-form-btn');
            if (submitBtn) {
                submitBtn.innerHTML = '<span>Message Sent Successfully!</span>';
                submitBtn.style.background = 'var(--accent-green)';
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = '<span>Send Message</span>';
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }
}

/* --------------------------------------------------------------------------
   6. Active Navigation Scroll Highlight
   -------------------------------------------------------------------------- */
function initScrollHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}
