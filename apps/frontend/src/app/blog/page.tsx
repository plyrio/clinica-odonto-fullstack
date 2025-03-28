import React from "react";
import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/layout/Section";
import BlogPost from "@/components/ui/blog/BlogPost";

export default function BlogMain() {
  return (
    <>
      <Hero title="Blog" />
      <Section >
        <BlogPost />
      </Section>

    </>
  );
}
