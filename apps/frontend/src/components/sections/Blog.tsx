import React from "react";
import Section from "../layout/Section";
import TitlesSection from "../utils/TitlesSection";
import BlogCard from "../cards/BlogCard";

export default function Blog() {
    return (
        <Section>
            <TitlesSection title="Blog & Artigos" />
            <BlogCard />
        </Section>
    );
}
