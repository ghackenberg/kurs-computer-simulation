namespace SFunctionContinuous.Framework
{
    public class Model
    {
        public List<Block> Blocks { get; } = new List<Block>();
        public List<Connection> Connections { get; } = new List<Connection>();

        public void AddBlock(Block f)
        {
            Blocks.Add(f);
        }

        public void AddConnection(Block sf, int sfy, Block tf, int tfu)
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

            sf.BlocksAfter.Add(tf);
            tf.BlocksBefore.Add(sf);

            sf.ConnectionsOut.Add(c);
            tf.ConnectionsIn.Add(c);

            Connections.Add(c);
        }
    }
}
