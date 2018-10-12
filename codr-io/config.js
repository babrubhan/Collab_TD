var oPath               = require('path');
var oFS                 = require('fs');
var oOS                 = require('os');

// GLOBALS
global.g_oConfig        = {};
global.g_oEditSessions  = {}; // DocumentID to EditSession instance.

// Set/validation production environmental variables.
g_oConfig = (function()
{
    // Get arguments.
    var oArgs = {};
    for (var i = 2; i < process.argv.length; i++)
    {
        var aParts = process.argv[i].split('=');
        oArgs[aParts[0].trim()] = aParts[1].trim();
    }

    // Populate Config object.
    var oConfig = {};
    oConfig.bIsProd   =  (oArgs.is_prod == '1');
    oConfig.iPort     =  (oArgs.port      ? parseInt(oArgs.port) : (oConfig.bIsProd ? 80 : 8020));
    oConfig.sDataPath =  (oArgs.data_path ? oArgs.data_path : function()
                            {
                                if (oConfig.bIsProd)
                                    return '/home/ubuntu/data';
                                else
                                {
                                    var sDataPath = oPath.join(oOS.tmpdir(), 'data');
                                    if(!oFS.existsSync(sDataPath))
                                        oFS.mkdirSync(sDataPath);
                                    return sDataPath;
                                }
                            }());
    return oConfig;
}());
