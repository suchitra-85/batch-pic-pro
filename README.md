# Image Resizer Tool 🖼️

A professional web-based batch image resizer and converter built with React, TypeScript, and Tailwind CSS. This tool allows you to resize multiple images simultaneously and convert them between different formats - all processed locally in your browser for maximum privacy and speed.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Features

- **📤 Drag & Drop Upload**: Intuitive drag-and-drop interface or browse to select multiple images
- **🖼️ Live Preview**: Real-time preview of uploaded images with easy management
- **⚙️ Custom Dimensions**: Set custom width and height for resized images
- **🔄 Format Conversion**: Convert between JPEG, PNG, and WebP formats
- **🎚️ Quality Control**: Adjustable quality settings for JPEG compression (10-100%)
- **📦 Batch Processing**: Process multiple images simultaneously
- **⬇️ Flexible Downloads**: Download images individually or as a ZIP archive
- **🎨 Beautiful UI**: Modern gradient design with smooth animations
- **🔒 Privacy First**: All processing happens locally in your browser - no server uploads

## 🎯 Task Objectives (Python Developer Internship - Task 7)

### Original Requirements
- **Objective**: Resize and convert images in batch
- **Tools**: Python, Pillow
- **Deliverables**: Script that resizes all images in a folder

### Web Implementation
This project achieves the same goals but with a modern web interface:
- ✅ Batch image processing
- ✅ Resize multiple images with custom dimensions
- ✅ Format conversion (JPEG, PNG, WebP)
- ✅ User-friendly interface instead of CLI
- ✅ Instant processing with live preview
- ✅ No installation required - runs in browser

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/suchitra-85/image-resizer-tool.git
cd image-resizer-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 📖 How to Use

### Step 1: Upload Images
- Click the upload area or drag and drop images
- Supports JPG, PNG, WEBP, and GIF formats
- Upload multiple images at once

### Step 2: Configure Settings
- Set desired **Width** and **Height** in pixels
- Choose output **Format** (JPEG, PNG, or WebP)
- Adjust **Quality** (for JPEG only, 10-100%)

### Step 3: Process & Download
- Click **"Process Images"** to resize all uploaded images
- Download images individually or click **"Download All (ZIP)"**
- Processed images maintain the quality you specified

## 🛠️ Built With

- **[React](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[JSZip](https://stuk.github.io/jszip/)** - ZIP file generation
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icons

## 📁 Project Structure

```
image-resizer-tool/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn UI components
│   │   ├── ImageUploader.tsx      # Drag & drop upload component
│   │   ├── ImagePreview.tsx       # Image preview grid
│   │   ├── ResizeControls.tsx     # Settings panel
│   │   └── ProcessedImages.tsx    # Download interface
│   ├── pages/
│   │   └── Index.tsx              # Main application page
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── App.tsx                    # App configuration
│   ├── index.css                  # Global styles & design system
│   └── main.tsx                   # Entry point
├── public/                        # Static assets
└── package.json                   # Dependencies
```

## 🎨 Design System

The application uses a custom design system with:
- **Primary Color**: Deep blue to purple gradient (HSL 250 70% 55% → 270 70% 65%)
- **Accent Color**: Vibrant cyan (HSL 185 95% 50%)
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Smooth Animations**: Custom transitions and hover effects
- **Dark Mode Support**: Automatic theme switching

## 🔧 Technical Implementation

### Image Processing
- Uses HTML5 Canvas API for client-side processing
- No server required - all processing happens in browser
- Maintains aspect ratios and image quality
- Supports multiple format conversions

### Performance
- Lazy loading for large image sets
- Optimized canvas rendering
- Memory-efficient blob handling
- Batch processing with async operations

## 📝 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo to Vercel
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Build and deploy from `dist` directory
- **Any Static Host**: Upload the contents of `dist` after running `npm run build`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Suchitra**
- GitHub: [@suchitra-85](https://github.com/suchitra-85)

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Built with React and modern web technologies

## 📧 Support

For questions or support, please open an issue in the GitHub repository.

---

**Made with ❤️ for Python Developer Internship - Task 7**
