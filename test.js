const { readFileSync, writeFileSync } = require('fs');

const courses = JSON.parse(readFileSync('./src/data/courses.json', 'utf8'));

const groups = {};

courses.forEach(course => {
    if (!groups[course.courseCode]) {
        groups[course.courseCode] = [];
    }
    groups[course.courseCode].push(course);
});

const ratios = {};

Object.entries(groups).forEach(([courseCode, courses]) => {
    const totalLectures = courses.filter(course => course.section.toLowerCase().includes("lec") || course.section.toLowerCase().includes("prt")).length;
    const others = courses.length - totalLectures;
    if(others > 0 && totalLectures > 0) {
        ratios[courseCode] = {
            ratio: others/totalLectures,
            lectures: totalLectures,
            type: courses.slice(-1)[0].section.slice(0,3)
        }
    }
});

// This will give insights
console.log(ratios);

const select = (courseCode, section) => {
    const course = courses.find(course => course.courseCode === courseCode && course.section === section);
    if(!course) {
        throw new Error(`Course ${courseCode} ${section} not found`);
    }
    if(!course.attachedCourses) {
        course.attachedCourses = [];
    }
    return course;
}

const removeAndSelect = (courseCode, section) => {
    const index = courses.findIndex(course => course.courseCode === courseCode && course.section === section);
    if(index === -1) {
        throw new Error(`Course ${courseCode} ${section} not found and cannot be removed`);
    }
    return courses.splice(index, 1)[0];
}


const group = (courseCode, lec, others) => {
    others.forEach(other => {
        select(courseCode, lec).attachedCourses.push(removeAndSelect(courseCode, other));
    })
}

try{Object.entries(ratios).forEach(([courseCode, { ratio, lectures, type }]) => {
    for (let lec = 0; lec < lectures; lec++) {
        const replaceArr = Array.from( { length: ratio}, (_, i) => `${type} ${(ratio*lec)+(i+1)}`);
        console.log(courseCode, `LEC ${lec+1}`, replaceArr);
        group(courseCode, `LEC ${lec+1}`, replaceArr);
    }
})}
catch(e) {
    console.log(e);
    console.log(select("CS 100", "LEC 1"));
}

writeFileSync('./src/data/courses2.json', JSON.stringify(courses, null, 4));

// group("CHEM 503", "LEC 1", ["LAB 1"])
// group('CS 100', 'LEC 1', ['LAB 1'])
// group("CS 100", "LEC 2", ["LAB 2"])
// group("CS 100", "LEC 3", ["LAB 3"])
// group("CS 100", "LEC 4", ["LAB 4"])
// group("CS 100", "LEC 5", ["LAB 5"])
// group("CS 200", "LEC 1", ["LAB 1"])
// group("CS 200", "LEC 2", ["LAB 2"])
// group("CS 200", "LEC 3", ["LAB 3"])
// group("DISC 112", "LEC 1", ["LAB 1"])
// group('ECON 111', 'LEC 1', ['RAC 1', 'RAC 2', 'RAC 3']);

// console.log(select("ECON 111", "LEC 1"))
