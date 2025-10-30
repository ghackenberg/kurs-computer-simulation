﻿using SharpGL;

namespace VorlageSzenengraph3D.Model
{
    public class Material
    {
        public static readonly Material BLACK = new Material(Color.BLACK);
        public static readonly Material DARKGRAY = new Material(Color.DARKGRAY);
        public static readonly Material GRAY = new Material(Color.GRAY);
        public static readonly Material LIGHTGRAY = new Material(Color.LIGHTGRAY);
        public static readonly Material WHITE = new Material(Color.WHITE);

        public static readonly Material RED = new Material(Color.RED);
        public static readonly Material GREEN = new Material(Color.GREEN);
        public static readonly Material BLUE = new Material(Color.BLUE);

        public Color Ambient { get; set; }
        public Color Diffuse { get; set; }
        public Color Specular { get; set; }

        public Material(float red, float green, float blue) : this(red, green, blue, 1)
        {

        }

        public Material(float red, float green, float blue, float alpha) : this(new Color(red, green, blue, alpha))
        {

        }

        public Material(Color color) : this(color, color, color)
        {

        }

        public Material(Color ambient, Color diffuse, Color specular)
        {
            Ambient = ambient;
            Diffuse = diffuse;
            Specular = specular;
        }

        public void Apply(OpenGL gl)
        {
            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_AMBIENT, Ambient.Array());
            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_DIFFUSE, Diffuse.Array());
            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_SPECULAR, Specular.Array());
        }

        public Material Clone()
        {
            return new Material(Ambient.Clone(), Diffuse.Clone(), Specular.Clone());
        }
    }
}
