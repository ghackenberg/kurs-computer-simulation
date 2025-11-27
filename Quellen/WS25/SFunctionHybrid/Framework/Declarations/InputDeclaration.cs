namespace SFunctionHybrid.Framework.Declarations
{
    public class InputDeclaration : Declaration
    {
        public bool DirectFeedThrough { get; }

        public InputDeclaration(string name, bool directFeedThrough) : base(name)
        {
            DirectFeedThrough = directFeedThrough;
        }
    }
}
