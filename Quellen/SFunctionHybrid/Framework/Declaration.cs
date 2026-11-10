namespace SFunctionHybrid.Framework
{
    public abstract class Declaration
    {
        public string Name { get; }

        public Declaration(string name)
        {
            Name = name;
        }
    }
}
