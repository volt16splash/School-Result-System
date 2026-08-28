/**
 * gradeCalculator.js
 * 
 * Isolated grade calculation engine.
 * Pure functions — no DOM access, no side effects.
 * Takes raw scores and returns computed values.
 * 
 * To swap for PHP-supplied data later: replace the hardcoded
 * arrays with data fetched from a PHP endpoint, then pass
 * the same shaped arrays into these functions.
 */

var GradeCalculator = (function () {

    var GRADE_SCALE = [
        { min: 70, max: 100, grade: 'A', remark: 'Excellent' },
        { min: 60, max: 69,  grade: 'B', remark: 'Very Good' },
        { min: 50, max: 59,  grade: 'C', remark: 'Good' },
        { min: 45, max: 49,  grade: 'D', remark: 'Fair' },
        { min: 40, max: 44,  grade: 'E', remark: 'Pass' },
        { min: 0,  max: 39,  grade: 'F', remark: 'Fail' }
    ];

    /**
     * Compute total, grade, and remark from CA and exam scores.
     * @param {number} caScore - CA score (0-40)
     * @param {number} examScore - Exam score (0-60)
     * @returns {{ total: number, grade: string, remark: string }}
     */
    function computeResult(caScore, examScore) {
        var total = Math.round((caScore + examScore) * 100) / 100;
        var grade = '';
        var remark = '';

        for (var i = 0; i < GRADE_SCALE.length; i++) {
            if (total >= GRADE_SCALE[i].min && total <= GRADE_SCALE[i].max) {
                grade = GRADE_SCALE[i].grade;
                remark = GRADE_SCALE[i].remark;
                break;
            }
        }

        return { total: total, grade: grade, remark: remark };
    }

    /**
     * Compute results for a list of raw score entries.
     * Each entry: { subject, caScore, examScore }
     * Returns array with { subject, caScore, examScore, total, grade, remark }
     * @param {Array} rawScores
     * @returns {Array}
     */
    function computeResultsBatch(rawScores) {
        var results = [];
        for (var i = 0; i < rawScores.length; i++) {
            var entry = rawScores[i];
            var computed = computeResult(entry.caScore, entry.examScore);
            results.push({
                subject: entry.subject,
                caScore: entry.caScore,
                examScore: entry.examScore,
                total: computed.total,
                grade: computed.grade,
                remark: computed.remark
            });
        }
        return results;
    }

    /**
     * Compute term average from an array of subject totals.
     * @param {Array<number>} subjectTotals
     * @returns {{ average: number, grade: string, remark: string }}
     */
    function computeTermAverage(subjectTotals) {
        if (subjectTotals.length === 0) {
            return { average: 0, grade: '-', remark: 'No results' };
        }

        var sum = 0;
        for (var i = 0; i < subjectTotals.length; i++) {
            sum += subjectTotals[i];
        }

        var average = Math.round((sum / subjectTotals.length) * 100) / 100;
        var computed = computeResult(0, 0);

        // Find grade for the average value
        for (var j = 0; j < GRADE_SCALE.length; j++) {
            if (average >= GRADE_SCALE[j].min && average <= GRADE_SCALE[j].max) {
                computed = { total: average, grade: GRADE_SCALE[j].grade, remark: GRADE_SCALE[j].remark };
                break;
            }
        }

        return { average: average, grade: computed.grade, remark: computed.remark };
    }

    /**
     * Compute year average from term averages.
     * @param {Array<number>} termAverages - average for each term that has data
     * @returns {{ average: number, grade: string, remark: string }}
     */
    function computeYearAverage(termAverages) {
        if (termAverages.length === 0) {
            return { average: 0, grade: '-', remark: 'No results' };
        }

        var sum = 0;
        for (var i = 0; i < termAverages.length; i++) {
            sum += termAverages[i];
        }

        var average = Math.round((sum / termAverages.length) * 100) / 100;

        for (var j = 0; j < GRADE_SCALE.length; j++) {
            if (average >= GRADE_SCALE[j].min && average <= GRADE_SCALE[j].max) {
                return { average: average, grade: GRADE_SCALE[j].grade, remark: GRADE_SCALE[j].remark };
            }
        }

        return { average: average, grade: '-', remark: 'Unknown' };
    }

    /**
     * Get the full grade scale configuration.
     * @returns {Array}
     */
    function getGradeScale() {
        return GRADE_SCALE.slice();
    }

    return {
        computeResult: computeResult,
        computeResultsBatch: computeResultsBatch,
        computeTermAverage: computeTermAverage,
        computeYearAverage: computeYearAverage,
        getGradeScale: getGradeScale
    };

})();
