namespace SFunctionContinuous.Model
{
    class Composition
    {
        public List<Function> Functions = new List<Function>();
        public List<Connection> Connections = new List<Connection>();

        public void AddFunction(Function f)
        {
            Functions.Add(f);
        }

        public void AddConnection(Function sf, int sfy, Function tf, int tfu)
        {
            if (sfy >= sf.DimY)
            {
                throw new Exception("Source output not defined!");
            }
            if (tfu >= tf.DimU)
            {
                throw new Exception("Target input not defined!");
            }

            foreach (Connection connection in Connections)
            {
                if (connection.Target == tf && connection.Input == tfu)
                {
                    throw new Exception("Target input already connected!");
                }
            }

            Connection c = new Connection(sf, sfy, tf, tfu);

            sf.FunctionsAfter.Add(tf);
            tf.FunctionsBefore.Add(sf);

            sf.ConnectionsOut.Add(c);
            tf.ConnectionsIn.Add(c);

            Connections.Add(c);
        }
    }
}
