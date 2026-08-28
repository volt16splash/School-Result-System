/**
 * script.js
 * 
 * Shared JavaScript: navbar rendering, form validation helpers,
 * success/error message display, and dummy data.
 * 
 * Dummy data arrays are structured so they can later be replaced
 * with data fetched from PHP endpoints without changing display logic.
 */

/* ========================================
   DUMMY DATA
   ======================================== */

var SCHOOL_INFO = {
    name: 'Greenfield International Academy',
    motto: 'Excellence Through Knowledge',
    established: 2005,
    description: 'Greenfield International Academy is a co-educational institution committed to nurturing well-rounded students through academic excellence, moral discipline, and co-curricular development. We provide a stimulating learning environment that equips students with the skills and values needed to thrive in a rapidly changing world.',
    address: '14 Academic Avenue,GRA Phase 3,Port Harcourt, Rivers State, Nigeria',
    contactEmail: 'info@greenfieldacademy.edu.ng',
    contactPhone: '+234 801 234 5678'
};

var STUDENTS = [
    { id: 1, name: 'Adebayo Johnson', admissionNo: 'GFA/2025/001', classLevel: 'JSS 1A', guardianEmail: 'bayo.johnson@email.com' },
    { id: 2, name: 'Chioma Okafor', admissionNo: 'GFA/2025/002', classLevel: 'JSS 1A', guardianEmail: 'chioma.o@email.com' },
    { id: 3, name: 'Fatima Abdulrahman', admissionNo: 'GFA/2025/003', classLevel: 'JSS 1B', guardianEmail: 'fatima.a@email.com' },
    { id: 4, name: 'Emeka Nwosu', admissionNo: 'GFA/2025/004', classLevel: 'JSS 2A', guardianEmail: 'emeka.n@email.com' },
    { id: 5, name: 'Amina Bello', admissionNo: 'GFA/2025/005', classLevel: 'JSS 2A', guardianEmail: 'amina.b@email.com' },
    { id: 6, name: 'Tunde Bakare', admissionNo: 'GFA/2024/006', classLevel: 'JSS 3A', guardianEmail: 'tunde.b@email.com' },
    { id: 7, name: 'Ngozi Eze', admissionNo: 'GFA/2024/007', classLevel: 'JSS 3A', guardianEmail: 'ngozi.e@email.com' },
    { id: 8, name: 'Yusuf Abdullahi', admissionNo: 'GFA/2024/008', classLevel: 'SS 1A', guardianEmail: 'yusuf.a@email.com' }
];

var SUBJECTS = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'English Language' },
    { id: 3, name: 'Basic Science' },
    { id: 4, name: 'Social Studies' },
    { id: 5, name: 'Computer Studies' },
    { id: 6, name: 'Civic Education' },
    { id: 7, name: 'Physical & Health Education' },
    { id: 8, name: 'Agricultural Science' },
    { id: 9, name: 'Home Economics' },
    { id: 10, name: 'French Language' }
];

var ACADEMIC_YEARS = [
    { id: 1, label: '2025/2026', startDate: '2025-09-08', endDate: '2026-07-15' },
    { id: 2, label: '2024/2025', startDate: '2024-09-09', endDate: '2025-07-16' }
];

var TERMS = ['First Term', 'Second Term', 'Third Term'];

// Raw results: { studentId, subjectId, academicYearId, term, caScore, examScore }
// Only raw scores are stored — grades/averages are computed at display time.
var RESULTS = [
    // Student 1 — 2025/2026 First Term
    { studentId: 1, subjectId: 1,  academicYearId: 1, term: 'First Term', caScore: 32, examScore: 48 },
    { studentId: 1, subjectId: 2,  academicYearId: 1, term: 'First Term', caScore: 28, examScore: 42 },
    { studentId: 1, subjectId: 3,  academicYearId: 1, term: 'First Term', caScore: 35, examScore: 50 },
    { studentId: 1, subjectId: 4,  academicYearId: 1, term: 'First Term', caScore: 30, examScore: 45 },
    { studentId: 1, subjectId: 5,  academicYearId: 1, term: 'First Term', caScore: 38, examScore: 55 },
    { studentId: 1, subjectId: 6,  academicYearId: 1, term: 'First Term', caScore: 25, examScore: 38 },
    { studentId: 1, subjectId: 7,  academicYearId: 1, term: 'First Term', caScore: 33, examScore: 47 },
    { studentId: 1, subjectId: 8,  academicYearId: 1, term: 'First Term', caScore: 29, examScore: 41 },
    { studentId: 1, subjectId: 9,  academicYearId: 1, term: 'First Term', caScore: 36, examScore: 52 },
    { studentId: 1, subjectId: 10, academicYearId: 1, term: 'First Term', caScore: 22, examScore: 35 },

    // Student 1 — 2025/2026 Second Term
    { studentId: 1, subjectId: 1,  academicYearId: 1, term: 'Second Term', caScore: 35, examScore: 52 },
    { studentId: 1, subjectId: 2,  academicYearId: 1, term: 'Second Term', caScore: 30, examScore: 45 },
    { studentId: 1, subjectId: 3,  academicYearId: 1, term: 'Second Term', caScore: 33, examScore: 48 },
    { studentId: 1, subjectId: 4,  academicYearId: 1, term: 'Second Term', caScore: 28, examScore: 40 },
    { studentId: 1, subjectId: 5,  academicYearId: 1, term: 'Second Term', caScore: 36, examScore: 54 },
    { studentId: 1, subjectId: 6,  academicYearId: 1, term: 'Second Term', caScore: 27, examScore: 42 },
    { studentId: 1, subjectId: 7,  academicYearId: 1, term: 'Second Term', caScore: 34, examScore: 49 },
    { studentId: 1, subjectId: 8,  academicYearId: 1, term: 'Second Term', caScore: 31, examScore: 44 },
    { studentId: 1, subjectId: 9,  academicYearId: 1, term: 'Second Term', caScore: 37, examScore: 53 },
    { studentId: 1, subjectId: 10, academicYearId: 1, term: 'Second Term', caScore: 24, examScore: 38 },

    // Student 1 — 2025/2026 Third Term
    { studentId: 1, subjectId: 1,  academicYearId: 1, term: 'Third Term', caScore: 36, examScore: 54 },
    { studentId: 1, subjectId: 2,  academicYearId: 1, term: 'Third Term', caScore: 32, examScore: 48 },
    { studentId: 1, subjectId: 3,  academicYearId: 1, term: 'Third Term', caScore: 34, examScore: 50 },
    { studentId: 1, subjectId: 4,  academicYearId: 1, term: 'Third Term', caScore: 29, examScore: 43 },
    { studentId: 1, subjectId: 5,  academicYearId: 1, term: 'Third Term', caScore: 37, examScore: 56 },
    { studentId: 1, subjectId: 6,  academicYearId: 1, term: 'Third Term', caScore: 26, examScore: 40 },
    { studentId: 1, subjectId: 7,  academicYearId: 1, term: 'Third Term', caScore: 35, examScore: 51 },
    { studentId: 1, subjectId: 8,  academicYearId: 1, term: 'Third Term', caScore: 30, examScore: 43 },
    { studentId: 1, subjectId: 9,  academicYearId: 1, term: 'Third Term', caScore: 38, examScore: 54 },
    { studentId: 1, subjectId: 10, academicYearId: 1, term: 'Third Term', caScore: 25, examScore: 40 },

    // Student 1 — 2024/2025 First Term
    { studentId: 1, subjectId: 1,  academicYearId: 2, term: 'First Term', caScore: 30, examScore: 45 },
    { studentId: 1, subjectId: 2,  academicYearId: 2, term: 'First Term', caScore: 26, examScore: 40 },
    { studentId: 1, subjectId: 3,  academicYearId: 2, term: 'First Term', caScore: 32, examScore: 46 },

    // Student 2 — 2025/2026 First Term
    { studentId: 2, subjectId: 1,  academicYearId: 1, term: 'First Term', caScore: 36, examScore: 52 },
    { studentId: 2, subjectId: 2,  academicYearId: 1, term: 'First Term', caScore: 33, examScore: 48 },
    { studentId: 2, subjectId: 3,  academicYearId: 1, term: 'First Term', caScore: 30, examScore: 44 },
    { studentId: 2, subjectId: 4,  academicYearId: 1, term: 'First Term', caScore: 28, examScore: 42 },
    { studentId: 2, subjectId: 5,  academicYearId: 1, term: 'First Term', caScore: 38, examScore: 56 }
];

var ANNOUNCEMENTS = [
    {
        id: 1,
        title: 'Second Term Examinations Schedule Released',
        body: 'The examination timetable for Second Term 2025/2026 has been released. All students are advised to check the notice board and prepare adequately. Examinations begin on Monday, 6th April 2026. Students should come with their ID cards and examination slips.',
        authorId: 1,
        createdAt: '2026-03-15'
    },
    {
        id: 2,
        title: 'PTA Meeting — Saturday, 22nd March',
        body: 'Parents and Guardians are cordially invited to the Parent-Teacher Association meeting scheduled for Saturday, 22nd March 2026 at 10:00 AM in the school auditorium. Agenda items include the mid-term report review and planning for the upcoming inter-house sports.',
        authorId: 1,
        createdAt: '2026-03-10'
    },
    {
        id: 3,
        title: 'Inter-House Sports Competition',
        body: 'The annual inter-house sports competition will hold on Friday, 28th March 2026. All students are expected to participate in at least one event. House captains should submit their list of athletes to the PE department before Wednesday, 20th March.',
        authorId: 1,
        createdAt: '2026-03-05'
    },
    {
        id: 4,
        title: 'School Resumption — Third Term 2025/2026',
        body: 'Third Term lessons commence on Monday, 20th April 2026. All students are expected to resume with their complete school uniforms and all required textbooks. New students should report to the registration office with their admission letters.',
        authorId: 1,
        createdAt: '2026-03-01'
    },
    {
        id: 5,
        title: 'Science Fair — Call for Projects',
        body: 'The 2026 Science Fair is scheduled for 15th May. Students interested in presenting projects should register with their science teachers before 30th April. Projects can be individual or group (max 3 members). This year\'s theme is "Technology for Sustainable Development."',
        authorId: 1,
        createdAt: '2026-02-20'
    }
];

var NEXT_STUDENT_ID = 9;


/* ========================================
   NAVBAR RENDERING
   ======================================== */

function getBasePath() {
    var path = window.location.pathname;
    if (path.indexOf('/admin/') !== -1) return '../';
    if (path.indexOf('/student/') !== -1) return '../';
    return '';
}

function renderNavbar(activePage) {
    var base = getBasePath();
    var isPublicPage = activePage === 'home' || activePage === 'announcements' || activePage === 'login';
    var isAdminPage = !isPublicPage && window.location.pathname.indexOf('/admin/') !== -1;
    var isStudentPage = !isPublicPage && window.location.pathname.indexOf('/student/') !== -1;

    var publicLinks = ''
        + '<li class="nav-item"><a class="nav-link' + (activePage === 'home' ? ' active' : '') + '" href="' + base + 'index.html">Home</a></li>'
        + '<li class="nav-item"><a class="nav-link' + (activePage === 'announcements' ? ' active' : '') + '" href="' + base + 'announcements.html">Announcements</a></li>';

    var authLinks = ''
        + '<li class="nav-item"><a class="nav-link' + (activePage === 'login' ? ' active' : '') + '" href="' + base + 'login.html">Login</a></li>';

    var html = ''
        + '<nav class="navbar navbar-expand-lg navbar-dark navbar-sms">'
        + '  <div class="container">'
        + '    <a class="navbar-brand" href="' + base + 'index.html">' + SCHOOL_INFO.name + '</a>'
        + '    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">'
        + '      <span class="navbar-toggler-icon"></span>'
        + '    </button>'
        + '    <div class="collapse navbar-collapse" id="mainNav">'
        + '      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">';

    if (isAdminPage) {
        html += ''
            + '<li class="nav-item"><a class="nav-link' + (activePage === 'admin-dashboard' ? ' active' : '') + '" href="' + base + 'admin/dashboard.html">Dashboard</a></li>'
            + '<li class="nav-item"><a class="nav-link' + (activePage === 'admin-students' ? ' active' : '') + '" href="' + base + 'admin/students.html">Students</a></li>'
            + '<li class="nav-item"><a class="nav-link' + (activePage === 'admin-results' ? ' active' : '') + '" href="' + base + 'admin/results.html">Results</a></li>'
            + '<li class="nav-item"><a class="nav-link' + (activePage === 'admin-announcements' ? ' active' : '') + '" href="' + base + 'admin/announcements.html">Announcements</a></li>'
            + '<li class="nav-item"><a class="nav-link" href="' + base + 'index.html">Public Site</a></li>'
            + '<li class="nav-item"><a class="nav-link" href="' + base + 'login.html">Logout</a></li>';
    } else if (isStudentPage) {
        html += ''
            + '<li class="nav-item"><a class="nav-link' + (activePage === 'student-results' ? ' active' : '') + '" href="' + base + 'student/results.html">My Results</a></li>'
            + '<li class="nav-item"><a class="nav-link" href="' + base + 'announcements.html">Announcements</a></li>'
            + '<li class="nav-item"><a class="nav-link" href="' + base + 'login.html">Logout</a></li>';
    } else {
        html += publicLinks + authLinks;
    }

    html += ''
        + '      </ul>'
        + '    </div>'
        + '  </div>'
        + '</nav>'
        + '<hr class="gold-accent m-0 p-0">';

    var navEl = document.getElementById('main-navbar');
    if (navEl) navEl.innerHTML = html;
}

function renderFooter() {
    var footerHtml = ''
        + '<footer class="footer-sms">'
        + '  <div class="container">'
        + '    <div class="row">'
        + '      <div class="col-md-4 mb-3 mb-md-0">'
        + '        <h6 class="text-gold mb-2" style="font-family: Georgia, serif;">' + SCHOOL_INFO.name + '</h6>'
        + '        <p style="font-size:0.85rem; margin:0;">' + SCHOOL_INFO.motto + '</p>'
        + '      </div>'
        + '      <div class="col-md-4 mb-3 mb-md-0">'
        + '        <h6 class="text-gold mb-2" style="font-family: Georgia, serif;">Contact Us</h6>'
        + '        <p style="font-size:0.85rem; margin:0;">' + SCHOOL_INFO.address + '</p>'
        + '        <p style="font-size:0.85rem; margin:0;">' + SCHOOL_INFO.contactPhone + '</p>'
        + '        <p style="font-size:0.85rem; margin:0;">' + SCHOOL_INFO.contactEmail + '</p>'
        + '      </div>'
        + '      <div class="col-md-4">'
        + '        <h6 class="text-gold mb-2" style="font-family: Georgia, serif;">Quick Links</h6>'
        + '        <p style="font-size:0.85rem; margin:0;"><a href="' + getBasePath() + 'index.html" class="text-white">Home</a> | '
        + '        <a href="' + getBasePath() + 'announcements.html" class="text-white">Announcements</a> | '
        + '        <a href="' + getBasePath() + 'login.html" class="text-white">Login</a></p>'
        + '      </div>'
        + '    </div>'
        + '    <div class="footer-bottom">'
        + '      &copy; ' + new Date().getFullYear() + ' ' + SCHOOL_INFO.name + '. All rights reserved.'
        + '    </div>'
        + '  </div>'
        + '</footer>';

    var footerEl = document.getElementById('main-footer');
    if (footerEl) footerEl.innerHTML = footerHtml;
}


/* ========================================
   FORM VALIDATION HELPERS
   ======================================== */

function validateRequired(value, fieldName) {
    if (!value || value.trim() === '') {
        return fieldName + ' is required.';
    }
    return null;
}

function validateScoreRange(value, min, max, fieldName) {
    var num = parseFloat(value);
    if (isNaN(num)) {
        return fieldName + ' must be a number.';
    }
    if (num < min || num > max) {
        return fieldName + ' must be between ' + min + ' and ' + max + '.';
    }
    return null;
}

function validateEmail(value, fieldName) {
    if (!value || value.trim() === '') return null; // optional
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value.trim())) {
        return fieldName + ' must be a valid email address.';
    }
    return null;
}

function validateUnique(value, existingArray, fieldName) {
    for (var i = 0; i < existingArray.length; i++) {
        if (existingArray[i].toLowerCase() === value.toLowerCase()) {
            return fieldName + ' already exists.';
        }
    }
    return null;
}

function showFormMessage(containerId, type, message) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var alertClass = type === 'success' ? 'alert-sms-success' : 'alert-sms-error';
    container.innerHTML = '<div class="' + alertClass + ' mb-3" role="alert">' + message + '</div>';
    setTimeout(function () {
        if (container.firstChild) container.firstChild.remove();
    }, 4000);
}

function clearFormMessage(containerId) {
    var container = document.getElementById(containerId);
    if (container) container.innerHTML = '';
}


/* ========================================
   HELPER: Get student name by ID
   ======================================== */

function getStudentName(studentId) {
    for (var i = 0; i < STUDENTS.length; i++) {
        if (STUDENTS[i].id === studentId) return STUDENTS[i].name;
    }
    return 'Unknown Student';
}

function getSubjectName(subjectId) {
    for (var i = 0; i < SUBJECTS.length; i++) {
        if (SUBJECTS[i].id === subjectId) return SUBJECTS[i].name;
    }
    return 'Unknown Subject';
}

function getYearLabel(yearId) {
    for (var i = 0; i < ACADEMIC_YEARS.length; i++) {
        if (ACADEMIC_YEARS[i].id === yearId) return ACADEMIC_YEARS[i].label;
    }
    return 'Unknown Year';
}


/* ========================================
   INIT: Run on page load
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    renderNavbar(document.body.getAttribute('data-page'));
    renderFooter();
});
