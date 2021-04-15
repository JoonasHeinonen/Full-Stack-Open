const listHelper = require('../utils/list_helper')

const blogs = [
    {
        'title': 'Test automation for Express.js',
        'author': 'Joonas Heinoonen, BBA',
        'url': 'localhost:3003/api/blogs',
        'likes': 9
    },
    {
        'title': 'Run Drupal with Docker',
        'author': 'Joonas Heinoonen, BBA',
        'url': 'localhost:3003/api/blogs',
        'likes': 100
    },
    {
        'title': 'C++ design patterns',
        'author': 'Dimitri Nesteruk',
        'url': 'https://www.pluralsight.com/paths/c-design-patterns?aid=7010a000002BWqGAAW&promo=&utm_source=non_branded&utm_medium=digital_paid_search_google&utm_campaign=EMEA_Dynamic&utm_content=&gclid=Cj0KCQjwyN-DBhCDARIsAFOELTnwkZaBhsu2AaTWaotdRhCiiGkbpbjqaR--g7ox36nax0tPb5_j3VcaAvG0EALw_wcB',
        'likes': 16
    }
];

const onlyOneBlog = [
    {
        'title': 'C++ design patterns',
        'author': 'Dimitri Nesteruk',
        'url': 'https://www.pluralsight.com/paths/c-design-patterns?aid=7010a000002BWqGAAW&promo=&utm_source=non_branded&utm_medium=digital_paid_search_google&utm_campaign=EMEA_Dynamic&utm_content=&gclid=Cj0KCQjwyN-DBhCDARIsAFOELTnwkZaBhsu2AaTWaotdRhCiiGkbpbjqaR--g7ox36nax0tPb5_j3VcaAvG0EALw_wcB',
        'likes': 16
    }
];

describe('total likes', () => {
    test('no blog, array 0', () => {
        expect(listHelper.totalLikes([])).toBe(0);
    });

    test('all likes of the only blog', () => {
        const result = listHelper.totalLikes(onlyOneBlog);
        expect(result).toBe(16);
    });

    test('likes of all the blogs', () => {
        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(125);
    });
});