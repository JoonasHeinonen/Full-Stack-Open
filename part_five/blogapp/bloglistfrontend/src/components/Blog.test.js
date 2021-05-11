import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { prettyDOM } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog';

describe('<Blog />', () => {
    test('renders author and title', () => {
        const blog = {
            title: 'Unit Testing React Components',
            author: 'Eric Elliott',
            url: 'https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2',
            likes: 10,
            user: '607d7f86a41abc411cd623c6'
        };
    
        const component = render(
            <Blog blog={blog} />
        );
    
        expect(component.container).toHaveTextContent(
            blog.title
        );
        expect(component.container).toHaveTextContent(
            blog.author
        );
        component.debug();
    });
});