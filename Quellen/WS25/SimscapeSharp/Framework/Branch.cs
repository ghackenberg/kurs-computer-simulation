namespace SimscapeSharp.Framework
{
    public class Branch
    {
        public Variable Internal { get; }
        public Variable ExternalSource { get; }
        public Variable ExternalTarget { get;  }

        public Branch(Variable _internal, Variable externalSource, Variable externalTarget)
        {
            Internal = _internal;

            ExternalSource = externalSource;
            ExternalTarget = externalTarget;
        }
    }
}
