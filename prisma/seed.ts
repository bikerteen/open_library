import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "../src/generated/prisma/client";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type SeedTool = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  pricing: string;
  icon: string;
  featured?: boolean;
  tags: string[];
};

const tools: SeedTool[] = [
  {
    name: "GIMP",
    tagline: "A full Photoshop replacement, completely free",
    description:
      "GIMP is a powerful image editor for retouching photos, composing images, and creating original art — with layers, filters, and tools that rival paid software.",
    url: "https://www.gimp.org",
    category: "Design & Graphics",
    pricing: "Free & Open Source",
    icon: "🖌️",
    featured: true,
    tags: ["photo editing", "graphics", "beginner-friendly"],
  },
  {
    name: "Inkscape",
    tagline: "Vector illustration without the Adobe price tag",
    description:
      "Inkscape is a professional vector graphics editor for logos, icons, illustrations, and diagrams, using the open SVG format.",
    url: "https://inkscape.org",
    category: "Design & Graphics",
    pricing: "Free & Open Source",
    icon: "✏️",
    tags: ["vector art", "illustration", "logos"],
  },
  {
    name: "Krita",
    tagline: "Digital painting built for illustrators",
    description:
      "Krita is a sketching and painting program built by artists who wanted a serious tool for digital painting, comics, and concept art.",
    url: "https://krita.org",
    category: "Design & Graphics",
    pricing: "Free & Open Source",
    icon: "🎨",
    featured: true,
    tags: ["digital painting", "illustration", "comics"],
  },
  {
    name: "Penpot",
    tagline: "Figma-style design & prototyping, in the open",
    description:
      "Penpot is a design and prototyping platform for cross-functional teams — think Figma, but open source and self-hostable.",
    url: "https://penpot.app",
    category: "Design & Graphics",
    pricing: "Free & Open Source",
    icon: "🧩",
    tags: ["ui design", "prototyping", "collaboration"],
  },
  {
    name: "Blender",
    tagline: "Hollywood-grade 3D, zero cost",
    description:
      "Blender is a complete 3D creation suite — modeling, sculpting, animation, rendering, and video editing, used in real film and game production.",
    url: "https://www.blender.org",
    category: "3D & Animation",
    pricing: "Free & Open Source",
    icon: "🧊",
    featured: true,
    tags: ["3d modeling", "animation", "rendering"],
  },
  {
    name: "FreeCAD",
    tagline: "Parametric 3D CAD for makers and engineers",
    description:
      "FreeCAD is a parametric 3D modeler made for designing real-world objects, from mechanical parts to architecture, perfect for 3D printing.",
    url: "https://www.freecad.org",
    category: "3D & Animation",
    pricing: "Free & Open Source",
    icon: "📐",
    tags: ["cad", "3d printing", "engineering"],
  },
  {
    name: "Kdenlive",
    tagline: "Timeline video editing that doesn't cost a subscription",
    description:
      "Kdenlive is a full-featured, non-linear video editor with multi-track editing, effects, and color correction for creators of any level.",
    url: "https://kdenlive.org",
    category: "Video Editing",
    pricing: "Free & Open Source",
    icon: "🎬",
    featured: true,
    tags: ["video editing", "youtube", "beginner-friendly"],
  },
  {
    name: "Shotcut",
    tagline: "Cross-platform video editing, keep it simple",
    description:
      "Shotcut is a free, open-source video editor supporting a wide range of formats with a clean, approachable interface.",
    url: "https://shotcut.org",
    category: "Video Editing",
    pricing: "Free & Open Source",
    icon: "✂️",
    tags: ["video editing", "cross-platform"],
  },
  {
    name: "HandBrake",
    tagline: "Convert video to any format, instantly",
    description:
      "HandBrake is the go-to tool for converting video from nearly any format into modern, widely-supported codecs.",
    url: "https://handbrake.fr",
    category: "Video Editing",
    pricing: "Free & Open Source",
    icon: "🔄",
    tags: ["video conversion", "compression"],
  },
  {
    name: "OBS Studio",
    tagline: "Record and stream like a pro, for free",
    description:
      "OBS Studio is the industry-standard free tool for live streaming and screen recording, used by streamers and creators everywhere.",
    url: "https://obsproject.com",
    category: "Video Editing",
    pricing: "Free & Open Source",
    icon: "📹",
    featured: true,
    tags: ["streaming", "screen recording", "youtube"],
  },
  {
    name: "Audacity",
    tagline: "Record, edit, and mix audio without limits",
    description:
      "Audacity is an easy-to-use audio editor and recorder for podcasts, music, and voiceovers, with support for effects and multi-track editing.",
    url: "https://www.audacityteam.org",
    category: "Audio & Music",
    pricing: "Free & Open Source",
    icon: "🎙️",
    featured: true,
    tags: ["podcasting", "audio editing", "beginner-friendly"],
  },
  {
    name: "Ardour",
    tagline: "A full digital audio workstation, no license fee",
    description:
      "Ardour is a professional-grade DAW for recording, editing, and mixing audio — built for musicians, engineers, and podcasters.",
    url: "https://ardour.org",
    category: "Audio & Music",
    pricing: "Free & Open Source",
    icon: "🎚️",
    tags: ["music production", "daw", "recording"],
  },
  {
    name: "LMMS",
    tagline: "Make beats and full tracks from scratch",
    description:
      "LMMS is a free music production suite for composing melodies and beats, synthesizing sounds, and mixing tracks — a great FL Studio alternative.",
    url: "https://lmms.io",
    category: "Audio & Music",
    pricing: "Free & Open Source",
    icon: "🎹",
    tags: ["music production", "beat making", "synth"],
  },
  {
    name: "Joplin",
    tagline: "Private, markdown-powered note taking",
    description:
      "Joplin is a note-taking and to-do app with end-to-end encryption, syncing, and markdown support — a great alternative to Evernote or Notion.",
    url: "https://joplinapp.org",
    category: "Writing & Notes",
    pricing: "Free & Open Source",
    icon: "📝",
    featured: true,
    tags: ["note taking", "markdown", "privacy"],
  },
  {
    name: "Zettlr",
    tagline: "A distraction-free writing app for big ideas",
    description:
      "Zettlr is a markdown editor built for academic writing, note-linking, and long-form projects like theses, papers, and books.",
    url: "https://www.zettlr.com",
    category: "Writing & Notes",
    pricing: "Free & Open Source",
    icon: "🖋️",
    tags: ["writing", "markdown", "research"],
  },
  {
    name: "LibreOffice",
    tagline: "The full office suite, without the subscription",
    description:
      "LibreOffice is a complete office suite — word processor, spreadsheets, presentations, and more — fully compatible with Microsoft formats.",
    url: "https://www.libreoffice.org",
    category: "Productivity & Office",
    pricing: "Free & Open Source",
    icon: "📄",
    featured: true,
    tags: ["office suite", "spreadsheets", "documents"],
  },
  {
    name: "ONLYOFFICE",
    tagline: "Collaborative docs, sheets, and slides",
    description:
      "ONLYOFFICE is an office suite with strong Microsoft Office format compatibility and real-time collaboration, self-hostable for full privacy.",
    url: "https://www.onlyoffice.com",
    category: "Productivity & Office",
    pricing: "Free & Open Source",
    icon: "🗂️",
    tags: ["office suite", "collaboration", "self-hosted"],
  },
  {
    name: "Bitwarden",
    tagline: "A password manager you can actually trust",
    description:
      "Bitwarden securely stores and autofills your passwords across every device, with open-source code you (or anyone) can audit.",
    url: "https://bitwarden.com",
    category: "Privacy & Security",
    pricing: "Free & Open Source",
    icon: "🔑",
    featured: true,
    tags: ["passwords", "security", "privacy"],
  },
  {
    name: "KeePassXC",
    tagline: "Offline password management, zero cloud required",
    description:
      "KeePassXC is a local-first password manager that keeps your encrypted vault entirely under your control — no account, no cloud.",
    url: "https://keepassxc.org",
    category: "Privacy & Security",
    pricing: "Free & Open Source",
    icon: "🗝️",
    tags: ["passwords", "offline", "privacy"],
  },
  {
    name: "VeraCrypt",
    tagline: "Encrypt your files like a security pro",
    description:
      "VeraCrypt creates encrypted, password-protected containers and drives to keep sensitive files completely private.",
    url: "https://www.veracrypt.fr",
    category: "Privacy & Security",
    pricing: "Free & Open Source",
    icon: "🛡️",
    tags: ["encryption", "privacy", "security"],
  },
  {
    name: "Signal",
    tagline: "Private messaging, the way it should be",
    description:
      "Signal offers end-to-end encrypted messaging, voice, and video calls, built by a nonprofit with privacy as the entire mission.",
    url: "https://signal.org",
    category: "Communication",
    pricing: "Free & Open Source",
    icon: "💬",
    featured: true,
    tags: ["messaging", "privacy", "encryption"],
  },
  {
    name: "Jitsi Meet",
    tagline: "Video calls with no account, no limits",
    description:
      "Jitsi Meet is a free video conferencing tool that runs right in the browser — no downloads, no sign-ups, no time limits.",
    url: "https://meet.jit.si",
    category: "Communication",
    pricing: "Free & Open Source",
    icon: "🎥",
    tags: ["video calls", "meetings", "no signup"],
  },
  {
    name: "Thunderbird",
    tagline: "Email that respects your inbox and your privacy",
    description:
      "Thunderbird is a free email client with calendar, contacts, and add-ons — a fast, privacy-respecting alternative to Outlook.",
    url: "https://www.thunderbird.net",
    category: "Communication",
    pricing: "Free & Open Source",
    icon: "📧",
    tags: ["email", "calendar", "privacy"],
  },
  {
    name: "darktable",
    tagline: "RAW photo editing for serious photographers",
    description:
      "darktable is a virtual lighttable and darkroom for photographers — manage and develop RAW photos non-destructively, free forever.",
    url: "https://www.darktable.org",
    category: "Photography",
    pricing: "Free & Open Source",
    icon: "📷",
    tags: ["raw editing", "photography", "lightroom alternative"],
  },
  {
    name: "RawTherapee",
    tagline: "Bring out every detail in your RAW photos",
    description:
      "RawTherapee is a powerful, free RAW image processor with advanced color and tone tools built for photography enthusiasts.",
    url: "https://rawtherapee.com",
    category: "Photography",
    pricing: "Free & Open Source",
    icon: "🌄",
    tags: ["raw editing", "photography"],
  },
  {
    name: "Godot Engine",
    tagline: "Build and ship games without licensing fees",
    description:
      "Godot is a feature-packed, open-source game engine for 2D and 3D games, with zero royalties and a beginner-friendly scripting language.",
    url: "https://godotengine.org",
    category: "Game Dev",
    pricing: "Free & Open Source",
    icon: "🎮",
    featured: true,
    tags: ["game development", "2d", "3d"],
  },
  {
    name: "Calibre",
    tagline: "Organize and convert your entire ebook library",
    description:
      "Calibre is an all-in-one ebook manager for organizing your library, converting formats, and syncing books to your e-reader.",
    url: "https://calibre-ebook.com",
    category: "Reading",
    pricing: "Free & Open Source",
    icon: "📚",
    tags: ["ebooks", "reading", "library management"],
  },
  {
    name: "VLC Media Player",
    tagline: "Plays literally anything you throw at it",
    description:
      "VLC is a free media player that plays almost any video or audio file, DVD, or stream — no codecs to install, ever.",
    url: "https://www.videolan.org/vlc",
    category: "Media Playback",
    pricing: "Free & Open Source",
    icon: "🔺",
    tags: ["media player", "video", "streaming"],
  },
];

async function main() {
  for (const tool of tools) {
    const { tags, ...data } = tool;
    await prisma.tool.create({
      data: {
        ...data,
        tags: {
          connectOrCreate: tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });
  }
  console.log(`Seeded ${tools.length} tools.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
