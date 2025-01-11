import React, {Suspense} from "react";
import Section from "../layout/Section";
import TitlesSection from "../utils/TitlesSection";
import BlogCard from "../cards/BlogCard";

export default function Blog() {
    return (
        <Section>
            <TitlesSection title="Blog & Artigos" />
                  <Suspense fallback={<div>Carregando...</div>}>
            <BlogCard />
            </Suspense>
        </Section>
    );
}
