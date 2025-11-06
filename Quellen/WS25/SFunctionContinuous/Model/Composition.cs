namespace SFunctionContinuous.Model
{
    class Composition
    {
        public List<Function> Functions { get; } = new List<Function>();
        public List<Connection> Connections { get; } = new List<Connection>();

        public void AddFunction(Function f)
        {
            Functions.Add(f);
        }

        public void AddConnection(Function sf, int sfy, Function tf, int tfu)
        {
            if (sfy >= sf.Outputs.Count)
            {
                throw new Exception("Source output not defined!");
            }
            if (tfu >= tf.Inputs.Count)
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
