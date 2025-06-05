
const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Your Canvas
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                A clean, empty space ready for your next great idea
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Start Building</h3>
                <p className="text-slate-600 text-sm">Begin crafting your vision</p>
              </div>
              
              <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Design Freedom</h3>
                <p className="text-slate-600 text-sm">Unlimited creative possibilities</p>
              </div>
              
              <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Your Space</h3>
                <p className="text-slate-600 text-sm">Ready when you are</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
