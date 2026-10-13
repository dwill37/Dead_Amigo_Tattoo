import type { StaticImageData } from "next/image";

import logo from "@/assets/logo-dead-amigo.png";
import duck from "@/image/image_2.jpg";
import poppies from "@/image/image_3.jpg";
import numerals from "@/image/image_4.jpg";
import astroCats from "@/image/image_5.jpg";
import sleepyDog from "@/image/image_6.jpg";
import artistAtWork from "@/image/image_7.jpg";
import stencil from "@/image/image_8.jpg";
import mask from "@/image/image_9.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const brand = { logo, logoAlt: "Dead Amigo" };

export const photos = {
  duck: {
    src: duck,
    alt: "Blackwork tattoo of an angry cartoon duck wrapped in flames, solid black fill with soft grey shading, on the arm.",
  },
  poppies: {
    src: poppies,
    alt: "Fine-line floral tattoo of open poppies and leaves in black outline, wrapping the knee and upper leg.",
  },
  numerals: {
    src: numerals,
    alt: "Lettering tattoo of the date IX-IX-MCMXCIX in Roman numerals running along the inner forearm.",
  },
  astroCats: {
    src: astroCats,
    alt: "Minimal linework tattoo of two cats wearing astronaut helmets, one spotted and one striped, on the lower back.",
  },
  sleepyDog: {
    src: sleepyDog,
    alt: "Cartoon tattoo of a sleeping fluffy dog with Z's floating above, black outline and dotwork shading on the forearm.",
  },
  artistAtWork: {
    src: artistAtWork,
    alt: "Masked tattoo artist in black gloves stretching the skin while tattooing a client at Dead Amigo.",
  },
  stencil: {
    src: stencil,
    alt: "Fresh stencil of a horned mask with roses and a sword on a client's lower leg, the stencil sheet taped beside it.",
  },
  mask: {
    src: mask,
    alt: "Linework tattoo of Majora's Mask from The Legend of Zelda with a sword and red-shaded roses on the forearm.",
  },
} satisfies Record<string, Photo>;
