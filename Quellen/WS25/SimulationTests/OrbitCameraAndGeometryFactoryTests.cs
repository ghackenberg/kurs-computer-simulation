using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using VorlageSzenengraph3D.Model;
using VorlageSzenengraph3D.Model.Nodes.Volumes;

namespace SimulationTests
{
    [TestClass]
    public class OrbitCameraAndGeometryFactoryTests
    {
        [TestMethod]
        public void Test_GeometryFactory_CreatesVolumesWithCorrectParameters()
        {
            var cyl = GeometryFactory.CreateCylinder(1.5f, 3.0f, 16, 2, Material.BLUE);
            Assert.IsNotNull(cyl);
            Assert.AreEqual(1.5f, cyl.Radius1);
            Assert.AreEqual(1.5f, cyl.Radius2);
            Assert.AreEqual(3.0f, cyl.Height);
            Assert.AreEqual(16, cyl.Slices);
            Assert.AreEqual(2, cyl.Stacks);

            var cone = GeometryFactory.CreateCone(2.0f, 4.0f, 20, 1, Material.GREEN);
            Assert.IsNotNull(cone);
            Assert.AreEqual(2.0f, cone.Radius1);
            Assert.AreEqual(0.0f, cone.Radius2);
            Assert.AreEqual(4.0f, cone.Height);

            var sphere = GeometryFactory.CreateSphere(2.5f, 24, 12, Material.RED);
            Assert.IsNotNull(sphere);
            Assert.AreEqual(2.5f, sphere.Radius);
            Assert.AreEqual(24, sphere.Slices);
            Assert.AreEqual(12, sphere.Stacks);

            var box = GeometryFactory.CreateBox(1.0f, 2.0f, 3.0f, Material.GRAY);
            Assert.IsNotNull(box);
            Assert.AreEqual(1.0f, box.Size.X);
            Assert.AreEqual(2.0f, box.Size.Y);
            Assert.AreEqual(3.0f, box.Size.Z);

            var cube = GeometryFactory.CreateCube(4.0f, Material.WHITE);
            Assert.IsNotNull(cube);
            Assert.AreEqual(4.0f, cube.Size.X);
            Assert.AreEqual(4.0f, cube.Size.Y);
            Assert.AreEqual(4.0f, cube.Size.Z);
        }

        [TestMethod]
        public void Test_OrbitCamera_RotateAndClamping()
        {
            var cam = new OrbitCamera
            {
                Azimuth = 45.0,
                Elevation = 30.0
            };

            // Test normal rotation
            cam.Rotate(15.0, 20.0);
            Assert.AreEqual(60.0, cam.Azimuth, 1e-9);
            Assert.AreEqual(50.0, cam.Elevation, 1e-9);

            // Test elevation clamping at upper bound (+89 degrees)
            cam.Rotate(0.0, 50.0);
            Assert.AreEqual(89.0, cam.Elevation, 1e-9);

            // Test elevation clamping at lower bound (-89 degrees)
            cam.Rotate(0.0, -200.0);
            Assert.AreEqual(-89.0, cam.Elevation, 1e-9);

            // Test azimuth modulo 360
            cam.Azimuth = 350.0;
            cam.Rotate(20.0, 0.0);
            Assert.AreEqual(10.0, cam.Azimuth, 1e-9);
        }

        [TestMethod]
        public void Test_OrbitCamera_ZoomAndClamping()
        {
            var cam = new OrbitCamera
            {
                Distance = 15.0,
                MinDistance = 2.0,
                MaxDistance = 100.0
            };

            // Normal zoom (positive delta = zoom in / decrease distance)
            cam.Zoom(5.0);
            Assert.AreEqual(10.0, cam.Distance, 1e-9);

            // Zoom out
            cam.Zoom(-20.0);
            Assert.AreEqual(30.0, cam.Distance, 1e-9);

            // Zoom in past minimum -> clamped to MinDistance
            cam.Zoom(200.0);
            Assert.AreEqual(2.0, cam.Distance, 1e-9);

            // Zoom out past maximum -> clamped to MaxDistance
            cam.Zoom(-500.0);
            Assert.AreEqual(100.0, cam.Distance, 1e-9);
        }

        [TestMethod]
        public void Test_OrbitCamera_TargetVectorProperty()
        {
            var cam = new OrbitCamera();
            cam.Target = new Vector(3.0f, 4.0f, 5.0f);

            Assert.AreEqual(3.0, cam.TargetX, 1e-5);
            Assert.AreEqual(4.0, cam.TargetY, 1e-5);
            Assert.AreEqual(5.0, cam.TargetZ, 1e-5);

            var targetVec = cam.Target;
            Assert.AreEqual(3.0f, targetVec.X);
            Assert.AreEqual(4.0f, targetVec.Y);
            Assert.AreEqual(5.0f, targetVec.Z);
        }
    }
}
