import { Linkedin } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4 text-center text-gray-200 flex justify-center items-center gap-2">
        <p>Made with NextJs by </p>
        <a href="https://www.linkedin.com/in/aman-kumar-singh-08b2b220b/" target="_blank">
            <Linkedin size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer