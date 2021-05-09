#include <napi.h>
#include <vector>

namespace core {

    Napi::Value PacketMethod(const Napi::CallbackInfo& info)
    {
        Napi::Env env = info.Env();

        return env.Null();
    }

    Napi::Object Initialize(Napi::Env env, Napi::Object exports)
    {
        exports.Set(Napi::String::New(env, "packet"),
            Napi::Function::New(env, PacketMethod));
        return exports;
    }

    NODE_API_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}