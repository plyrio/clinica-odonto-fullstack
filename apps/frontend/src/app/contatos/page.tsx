import React from "react";
import Hero from "@/components/sections/Hero";
import Contact from "@/components/sections/Contact";
import Section from "@/components/ui/layout/Section";

export default function ContactPage() {
  return (
    <>
      <Hero title="Contatos" />
      <Section>
        <Contact />
        <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </Section>
    </>
  );
}
